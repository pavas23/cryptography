const { BANK_DATA } = require("./config");

class Bank {
    constructor(Bid, name, password, IFSCcode, numberOfAccounts = 0, uid = []) {
        this.Bid = Bid;
        this.name = name;
        this.password = password;
        this.IFSCcode = IFSCcode;
        this.numberOfAccounts = numberOfAccounts;
        this.uid = uid;
    }
}

class bankList {
    constructor() {
        this.list = BANK_DATA;
    }
    addBank(Bank) {
        this.list.push(Bank);
    }
}

module.exports = {
    Bank: Bank,
    bankList: bankList,
}
