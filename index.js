const protobuf = require("protobufjs")
const fs = require("fs")
const argv = require('yargs').argv
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var atob = require('atob');
var btoa = require('btoa');



async function translatePBtoJS(cmd) {
    await exec(cmd, function(error, stdout, stderr) {
      if (error) {
          // node couldn't execute the command
          return;
        }
      });
  }

const run = (message) => {

    if(!checkArguments(argv,["t"])){
        message("No --t (type) specified");
        return;
    }

    if(argv.t === 1 && checkArguments(argv,["t","protoFile"])) {
        convertProtobuf(argv.protoFile, argv.outputFileName, message)
    }
    else if(argv.t === 2 && checkArguments(argv, ["t","protobufJSON", "lookupType"])) {
        // encodeProtobuf(argv.protobufJSON, argv.lookupType)
        message("not supported function")
    }
    else if(argv.t === 3 && checkArguments(argv, ["t","protoFile", "payload", "lookupType"])) {
        encodeProtobufWithPayload(argv.protoFile, argv.payload, argv.lookupType, message)
        
    }
    else if(argv.t === 4 && checkArguments(argv, ["t","protoFile", "serializedBase_64", "lookupType"])) {
        decodeProtobuf(argv.protoFile, argv.lookupType, argv.serializedBase_64, message)
    }
    else{
        console.error("An error occured. Exit with code 1");
        process.exit(1)
    }
}


// type 1
const convertProtobuf = (fromFile, toFile, callback) => {
    const fileName = `./convertedProto/${new Date().getTime()}${toFile ? "_" + toFile : ""}_protobufJSON.json`;
    const cmd = `./node_modules/.bin/pbjs -t json ${fromFile} > ${fileName}`;
    translatePBtoJS(cmd).then(callback(`succesfully created ${fileName}`))
}


//type 2
// const encodeProtobuf = (JSONprotoFile, lookupType) => {

//     protobuf.load(JSONprotoFile, function(err, root) {
//         if (err) throw err;

//         const AwesomeMessage = root.lookupType(lookupType);

//         var object = AwesomeMessage.toObject(root, {
//             longs: String,
//             enums: String,
//             bytes: String,
//           });
            
//         const buffer = AwesomeMessage.encode(object).finish();
//         const resultFileName = `./serializedBase_64/${new Date().String()}.bin`
        
//         fs.writeFile(resultFileName, buffer.getTime("base64"), (err) => {
//             if (err) throw err;
//         });

//     });
// }

//type 3
const encodeProtobufWithPayload = (protoFile, payloadPath, lookUpType, message) => {
    protobuf.load(protoFile, function(err, root) {
        if (err) throw err;
        
        var CustomMessage = root.lookupType(lookUpType);
        fs.readFile(payloadPath, (err, data) => {
                if (err) throw err;

            const payload = JSON.parse(data);
            const errMsg = CustomMessage.verify(payload);
            if (errMsg){
                // throw Error(errMsg);
                console.log("------------\nerror occured: ",errMsg)
                console.log("\nfunctionality might be unpredictable \n------------")
            }
            const msg = CustomMessage.create(payload); 
        
            const buffer = CustomMessage.encode(msg).finish();
            var decoder = new TextDecoder('utf8');
            var b64encoded = btoa(decoder.decode(buffer));


            const resultFileName = `./serializedBase_64/${new Date().getTime()}.bin`
            console.log(b64encoded)
            fs.writeFileSync(resultFileName, b64encoded, "binary");

            message(`result created ${resultFileName} `)

        });
        
    });
}

//type 4
const decodeProtobuf = (protoFile, lookupType, serializedBase_64, message) => {
    protobuf.load(protoFile, function(err, root) {
            if (err) throw err;

        var AwesomeMessage = root.lookupType(lookupType);
        fs.readFile(serializedBase_64, "utf-8" ,(err, data) => {
            if (err) throw err;

            var u8_2 = new Uint8Array(atob(data).split("").map(function(c) {
                return c.charCodeAt(0); }));
            var msg = AwesomeMessage.decode(u8_2);
            var object = AwesomeMessage.toObject(msg, {
                longs: String,
                enums: String,
                bytes: String,
            });
            const resultFileName = `./convertedSerializedBase_64/${new Date()}.json`;
            fs.writeFileSync(resultFileName, JSON.stringify(object));

            message(`result created ${resultFileName} `)
        });
        
    })
}


const startup = () => {
    const isParams = Object.keys(argv).length > 2
    if(isParams) {
        run(message => (console.log(message)));
    }
    else {
        console.error("you have not filled any arguments")
    }
}



const checkArguments = (argv, args) => {
    let isUndefined = true;
    args.forEach(element => {
        isUndefined = argv[element] ? true : false
    });
    return isUndefined
}

const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

startup();
