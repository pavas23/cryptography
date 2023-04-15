const { BANK_DATA } = require("./config");

class Bank {
    constructor(B_id, name, password, IFC_code, number_of_accounts = 0, uid = []) {
        this.B_id = B_id;
        this.name = name;
        this.password = password;
        this.IFC_code = IFC_code;
        this.number_of_accounts = number_of_accounts;
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
