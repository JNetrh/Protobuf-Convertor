
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/not-an-issue.svg)](https://forthebadge.com)


# Protobuf Convertor
Serialization - converts json files into Base64 decoded serialized binary .proto files
(binary message format).
De-serialization - converts Base64 encoded serialized binary .proto files (binary
message format) into json files.

### Prerequisities

- Node v 12.0.0 or higher
- npm v 6.4.1 or higher


### How to run
Pull the project from github CLI or Download directly .zip file and unpack

```bash
git@github.com:JNetrh/Protobuf-Convertor.git
```

Install dependencies in the same folder (root) as package.json. It will install necessary
libraries. 
```bash
$ npm install
```

#### argments
- --t                   type of the conversion
- --protoFile           the message structure (proto scheme) .proto file. See test.proto
- --outputFileName      a compulsary name of the output file. If not given the name is folded from the current timestamp.
- --protobufJSON        JSON file that corresponds with `--protoFile` './convertedProto/test_protobufJSON.json'
- --payload             the JSON file including data to be serialized into the binary message format (proto message)
- --serializedBase_64   the serialized Base64 encoded binary message file that is supposed to be converted/de-serialized into                         the JSON file
- --lookupType          the package name that can be found in the message structure (proto scheme) .proto file + the name of                           the &quot;main&quot; message in the same file



Converts a message structure (proto scheme) .proto file into a corresponding .json file
scheme/structure without values
```bash
$ node index.js --t=1 --protoFile="path/to/test.proto" --outputFileName="compulsoryName"
```

<!-- converts data-filled protobufJSON.json to serialized base64
```bash
$ node index.js --t=2 --protobufJSON="convertedProto/timestamp_compulsoryName_protobufJSON.json" --lookupType="test.Test"
``` -->

Converts the payload data json file into a serialized base64 binary message format (proto message) and stores it into the /serializedBase_64 folder
```bash
$ node index.js --t=3 --protoFile="test.proto" --payload="path/to/data.json" --lookupType="domain.backend.person.proto.RequestPersonData"
```

Converts the serializedBase_64 bin file (proto binary message) into a data json file and stores it into the /convertedSerializedBase_64 folder
```bash
$ node index.js --t=4 --protoFile="test.proto" --serializedBase_64="serializedBase_64/file.bin" --lookupType="domain.backend.person.proto.RequestPersonData"
```
