const { USER_DATA } = require("./config");
const cryptoHash = require('./crypto-hash');
var readlineSync = require('readline-sync');

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
    registerUser(){
        var userInput = {};
        userInput.uid = this.list.length+1;
        userInput.name = readlineSync.question('Enter Your Name: ');
        userInput.aadhaarId = readlineSync.question("Enter your aadhaarId: ");
        userInput.panId = readlineSync.question("Enter Your PanId: ");
        userInput.recoveryKey = readlineSync.question("Enter Your Recovery Key: ");
        userInput.bid = [];
        this.uidBlockHashMap.set(userInput.uid,[]);
        return userInput;
    };
}

module.exports = {
    user: user,
    userList: userList
};

