//just change the connection url to ethereum and your secet key to coinbase or any account you want to use
// but in that case give account public key in place of web3.eth.accounts[0]
// this UI will store user details on ethereum and return a hash that can be used to access details
// later.
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //web3 = new Web3(new Web3.providers.HttpProvider("----give your connection string-----"));
}

function addusr() {
    var _name = $('#name').val();
    var _company = $('#company').val();
    var _profession = $('#prof').val();

    console.log(_name, _company, _profession);

    var abidef = [{ "constant": true, "inputs": [], "name": "creator", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getprof", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getname", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getcompany", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_company", "type": "string" }, { "name": "_profession", "type": "string" }], "payable": false, "type": "constructor" }]

    var userdataContract = web3.eth.contract(abidef);

    web3.personal.unlockAccount(web3.eth.accounts[0], "----give your secret key---");

    var userdata_addr = userdataContract.new(
        _name,
        _company,
        _profession, {
            from: web3.eth.accounts[0],
            data: '0x6060604052341561000f57600080fd5b604051610643380380610643833981016040528080518201919060200180518201919060200180518201919050505b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600090805190602001906100959291906100cd565b5081600190805190602001906100ac9291906100cd565b5080600290805190602001906100c39291906100cd565b505b505050610172565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061010e57805160ff191683800117855561013c565b8280016001018555821561013c579182015b8281111561013b578251825591602001919060010190610120565b5b509050610149919061014d565b5090565b61016f91905b8082111561016b576000816000905550600101610153565b5090565b90565b6104c2806101816000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302d05d3f1461005f5780638c16cca5146100b4578063c6ea59b914610143578063dc26bf47146101d2575b600080fd5b341561006a57600080fd5b610072610261565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100bf57600080fd5b6100c7610287565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101085780820151818401525b6020810190506100ec565b50505050905090810190601f1680156101355780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561014e57600080fd5b610156610330565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101975780820151818401525b60208101905061017b565b50505050905090810190601f1680156101c45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101dd57600080fd5b6101e56103d9565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102265780820151818401525b60208101905061020a565b50505050905090810190601f1680156102535780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61028f610482565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103255780601f106102fa57610100808354040283529160200191610325565b820191906000526020600020905b81548152906001019060200180831161030857829003601f168201915b505050505090505b90565b610338610482565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103ce5780601f106103a3576101008083540402835291602001916103ce565b820191906000526020600020905b8154815290600101906020018083116103b157829003601f168201915b505050505090505b90565b6103e1610482565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104775780601f1061044c57610100808354040283529160200191610477565b820191906000526020600020905b81548152906001019060200180831161045a57829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a72305820cbfbb394cb09fcb0b1daa3b2d58c85f8215802be05b369e23fe6ca51dca7b0ba0029',
            gas: '4700000'
        },
        (e, contract) => {
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                $('#regaddr').val(contract.address);
            }
        })
}

function getdetails() {
    var usr_adr = $("#addr").val();
    var abidef = [{ "constant": true, "inputs": [], "name": "creator", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getprof", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getname", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getcompany", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_company", "type": "string" }, { "name": "_profession", "type": "string" }], "payable": false, "type": "constructor" }];

    var usercontract = web3.eth.contract(abidef).at(usr_adr);

    usercontract.getname((e, r) => {
        if (e) {
            console.log(e);
        }
        $('#name').val(r);
    });

    usercontract.getcompany((e, r) => {
        if (e) {
            console.log(e);
        }
        $('#company').val(r);
    });

    usercontract.getprof((e, r) => {
        if (e) {
            console.log(e);
        }
        $('#prof').val(r);
    });
}