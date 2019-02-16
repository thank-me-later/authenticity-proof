// addresses and ABIs of contracts deployed on ropsten
export const ensAbi = [{ "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }], "name": "resolver", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "label", "type": "bytes32" }, { "name": "owner", "type": "address" }], "name": "setSubnodeOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "ttl", "type": "uint64" }], "name": "setTTL", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }], "name": "ttl", "outputs": [{ "name": "", "type": "uint64" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "resolver", "type": "address" }], "name": "setResolver", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "owner", "type": "address" }], "name": "setOwner", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": false, "name": "owner", "type": "address" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": true, "name": "label", "type": "bytes32" }, { "indexed": false, "name": "owner", "type": "address" }], "name": "NewOwner", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": false, "name": "resolver", "type": "address" }], "name": "NewResolver", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": false, "name": "ttl", "type": "uint64" }], "name": "NewTTL", "type": "event" }]
export const ensAddress = "0x112234455C3a32FD11230C42E7Bccd4A84e02010";

export const registrarAbi = [{ "constant": true, "inputs": [], "name": "ens", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "bytes32" }], "name": "expiryTimes", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "subnode", "type": "bytes32" }, { "name": "owner", "type": "address" }], "name": "register", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "rootNode", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "ensAddr", "type": "address" }, { "name": "node", "type": "bytes32" }], "type": "constructor" }];
export const registrarAddress = "0x21397c1A1F4aCD9132fE36Df011610564b87E24b";

export const collectionRegistryAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxItems","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"maintainers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manufacturer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"items","outputs":[{"name":"publicKey","type":"address"},{"name":"identifier","type":"string"},{"name":"metaData","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_maxItems","type":"uint256"},{"name":"_maintainers","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"publicKey","type":"address"},{"indexed":false,"name":"identifier","type":"string"},{"indexed":false,"name":"metaData","type":"string"}],"name":"itemAdded","type":"event"},{"constant":false,"inputs":[{"name":"_publicKey","type":"address"},{"name":"_identifier","type":"string"},{"name":"_metaData","type":"string"}],"name":"addItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_publicKey","type":"address"}],"name":"checkItem","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];