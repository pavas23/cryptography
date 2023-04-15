const { USER_DATA } = require("./config");
const cryptoHash = require('./crypto-hash');

class user {
    constructor(uid, name, aadhaarId, panId, recoveryKey, bid = []) {
        this.uid = uid;
        this.name = name;
        this.aadhaarId = aadhaarId;
        this.panId = panId;
        this.recoveryKey = recoveryKey;
        this.bid = bid;
    }
}

class userList {
    constructor() {
        this.list = USER_DATA;
        this.uidPrivateHashMap = new Map();
        this.uidBlockHashMap = new Map();
    }
    addUser(user) {
        this.list.push(user);
    }
    addToUidPrivateHashMap(user) {
        var hashData = user.name + user.aadhaarId + user.panId;
        var privateHash = cryptoHash(hashData);
        this.uidPrivateHashMap.set(user.uid, privateHash);
    }
    addToHashAllUsers() {
        for (var user of this.list) {
            this.addToUidPrivateHashMap(user);
        }
    }
}

module.exports = {
    user: user,
    userList: userList
};

