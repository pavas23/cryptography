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
        this.updated = 0;
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
        userInput.updated = 0;
        userInput.uid = this.list.length+1;
        console.log("Enter your details to register ");
        userInput.name = readlineSync.question('Enter Your Name: ');
        var tempAadhaarId = readlineSync.question("Enter your aadhaarId: ");
        while(tempAadhaarId.length != 12){
            console.log("Please enter a valid 12 digit aadhaar ID");
            var tempAadhaarId = readlineSync.question("Enter your aadhaarId: ");
        }
        userInput.aadhaarId = tempAadhaarId;
        var tempPanId = readlineSync.question("Enter Your PanId: ");
        while(tempPanId.length != 10){
            console.log("Please enter a valid 10 digit pan ID");
            var tempPanId = readlineSync.question("Enter Your PanId: ");
        }
        userInput.panId = tempPanId;
        userInput.recoveryKey = readlineSync.question("Enter Your Recovery Key: ");
        userInput.bid = [];
        this.uidBlockHashMap.set(userInput.uid,[]);
        return userInput;
    };
    updateUser(id){
        var userInput = {};
        userInput.name = readlineSync.question('Enter Your Name: ');
        var tempAadhaarId = readlineSync.question("Enter your aadhaarId: ");
        while(tempAadhaarId.length != 12){
            console.log("Please enter a valid 12 digit aadhaar ID");
            var tempAadhaarId = readlineSync.question("Enter your aadhaarId: ");
        }
        userInput.aadhaarId = tempAadhaarId;
        var tempPanId = readlineSync.question("Enter Your PanId: ");
        while(tempPanId.length != 10){
            console.log("Please enter a valid 10 digit pan ID");
            var tempPanId = readlineSync.question("Enter Your PanId: ");
        }
        userInput.panId = tempPanId;
        var originalUser = this.list[id-1];
        originalUser.name = userInput.name;
        originalUser.aadhaarId = userInput.aadhaarId;
        originalUser.panId = userInput.panId;
        this.addToUidPrivateHashMap(originalUser);
    }
}

module.exports = {
    user: user,
    userList: userList
};

