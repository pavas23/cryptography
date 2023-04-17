const {Blockchain} = require("./blockchain");
const {user,userList} = require("./user");
const {bankList,Bank} = require("./bank");
var readlineSync = require('readline-sync');

const KYCVerificationBlockchain  = new Blockchain();

class Test{
    constructor(){
        this.initializeBlockchain();
    }
    initializeBlockchain(){
        for(var u of KYCVerificationBlockchain.userList.list){
            KYCVerificationBlockchain.createBlock(u,Math.random()*5,KYCVerificationBlockchain.generatePublicHash(u.uid));
        }    
    }
    printMenu(){
        console.log("Options for Blockchain");
        console.log("Press 0 to exit ");
        console.log("Press 1 to register user ");
        console.log("Press 2 if already registered ");
    }
    printMenu1(){
        console.log("Press 1 to view all your transactions ");
        console.log("Press 2 to initiate a new transaction ");
    }
    test(){
        while(true){
            this.printMenu();
            var num = readlineSync.question();
            if(num == 0){
                console.log("Exiting...");
                break;
            }
            else if(num == 1){
                var newUser = KYCVerificationBlockchain.userList.registerUser();
                KYCVerificationBlockchain.userList.addUser(newUser);
                KYCVerificationBlockchain.userList.addToUidPrivateHashMap(newUser);
                console.log(newUser);
            }else if(num == 2){
                this.printMenu1();
                var x = 0;
                x  = readlineSync.question();
                var userId = readlineSync.question("Enter your Uid: ");
                if(userId > KYCVerificationBlockchain.userList.list.length){
                    console.log("Invalid user id!!");
                    continue;
                }
                var currUser = KYCVerificationBlockchain.userList.list[userId-1];
                if(x == 1){
                    KYCVerificationBlockchain.viewUser(currUser);
                }else{
                    if(currUser.bid.length == 0){
                        console.log("This is your initial verification: ");
                        var BankId = readlineSync.question("Enter the id of the bank you are applying to: ");
                        KYCVerificationBlockchain.createBlock(currUser,BankId,generatePublicHash(currUser.uid));
                    }else{
                        console.log("This is your new verification: ");
                        var BankId = readlineSync.question("Enter the id of the new bank you are applying to: ");
                        KYCVerificationBlockchain.verifyTransaction(currUser.uid,BankId);
                    }
                }
            }
        }
    }
}

const test = new Test();
test.test();