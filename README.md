
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/not-an-issue.svg)](https://forthebadge.com)


# Protobuf Convertor
Converts .proto files to protobusJSON.json files. Also includes convertor for protobuf files from and to Base64 encoding 

### Prerequisities

- Node v 11.0.0 or higher
- npm 6.4.1 or higher


### How to run
First install dependecies in the same folder as package.json. This will install necesarry libraries. 
```bash
$ npm install
```

#### argments
- --t                   type of the conversion
- --protoFile           classical .proto file. See test.proto
- --outputFileName      compulsory name of the output file. Otherwise the name is folded from current timestamp.
- --protobufJSON        JSON file that corresponds with `--protoFile` './convertedProto/test_protobufJSON.json'
- --payload             JSON that includes data to fill into protobuf
- --serializedBase_64   serialized Base64 encoding file that is supposed to convert to protobuf message
- --lookupType          package name that can be faound in .proto file + name of the "main" message



converts .proto file to a corresponding .json file
```bash
$ node index.js --t=1 --protoFile="patht/to/example.proto" --outputFileName="compulsoryName"
```

<!-- converts data-filled protobufJSON.json to serialized base64
```bash
$ node index.js --t=2 --protobufJSON="convertedProto/timestamp_compulsoryName_protobufJSON.json" --lookupType="test.Test"
``` -->

converts protoFile (.proto) to serialized base64 with data included in payload.json file
```bash
$ node index.js --t=3 --protobufJSON="test.proto" --payload="path/to/payload.json" --lookupType="test.Test"
```

converts serialized base64 to protobuf message according to .proto schema.
```bash
$ ndoe index.js --t=4 --protoFile="patht/to/example.proto" --serializedBase_64="path/to/serializedBase64" --lookupType="test.Test"
```