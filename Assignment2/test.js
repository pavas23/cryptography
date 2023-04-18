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
        console.log();
        console.log("Options for KYC Verification Blockchain");
        console.log("Press 0 to exit the blockchain ");
        console.log("Press 1 to register user ");
        console.log("Press 2 if already registered ");
    }
    printMenuAlreadyRegistered(){
        console.log();
        console.log("Press 1 to view all your transactions ");
        console.log("Press 2 to initiate a new transaction ");
    }
    test(){
        while(true){
            this.printMenu();
            var num = readlineSync.question();
            if(num == 0){
                console.log("Exiting From Blockchain!");
                break;
            }
            else if(num == 1){
                var newUser = KYCVerificationBlockchain.userList.registerUser();
                KYCVerificationBlockchain.userList.addUser(newUser);
                KYCVerificationBlockchain.userList.addToUidPrivateHashMap(newUser);
                console.log("Details of newly registered user are");
                console.log(newUser);
            }else if(num == 2){
                this.printMenuAlreadyRegistered();
                var x = 0;
                x  = readlineSync.question();
                var userId = readlineSync.question("Enter your User Id: ");
                if(userId > KYCVerificationBlockchain.userList.list.length){
                    console.log("Invalid user id!!");
                    console.log("Try Again");
                    continue;
                }
                var currUser = KYCVerificationBlockchain.userList.list[userId-1];
                if(x == 1){
                    KYCVerificationBlockchain.viewUser(currUser);
                }else{
                    console.log("This is your initial KYC verification: ");
                    console.log();
                    console.log("Details of all banks registered in Blockchain");
                    console.log();
                    console.log(KYCVerificationBlockchain.bankList.list);
                    console.log();
                    var BankId = readlineSync.question("Enter the id of the bank you are applying to for KYC Verification: ");
                    if(currUser.bid.length == 0){
                        KYCVerificationBlockchain.createBlock(currUser,BankId,KYCVerificationBlockchain.generatePublicHash(currUser.uid));
                    }else{
                        KYCVerificationBlockchain.verifyTransaction(currUser.uid,BankId);
                    }
                    console.log("Transaction successfull !!");
                }
            }
        }
    }
}

const test = new Test();
test.test();