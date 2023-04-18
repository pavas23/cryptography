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
        console.log("Press 3 to print the blockchain ");
        console.log();
    }
    printMenuAlreadyRegistered(){
        console.log();
        console.log("Press 1 to view all your transactions ");
        console.log("Press 2 to initiate a new transaction ");
        console.log("Press 3 to update your details ");
        console.log();
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
                console.log();
                console.log("Details of newly registered user are");
                console.log(newUser);
            }else if(num == 2){
                var userId = readlineSync.question("Enter your User Id: ");
                this.printMenuAlreadyRegistered();
                var x = 0;
                x  = readlineSync.question();
                if(userId > KYCVerificationBlockchain.userList.list.length){
                    console.log("Invalid user id!!");
                    console.log("Try Again");
                    continue;
                }
                var currUser = KYCVerificationBlockchain.userList.list[userId-1];
                if(x == 1){
                    KYCVerificationBlockchain.viewUser(currUser);
                }else if(x == 2){
                    console.log("This is your initial KYC verification: ");
                    console.log();
                    console.log("Details of all banks registered in Blockchain");
                    console.log();
                    for(var bank of KYCVerificationBlockchain.bankList.list){
                        var obj = {};
                        obj.id = bank.Bid;
                        obj.name = bank.name;
                        console.log(obj);
                    }
                    console.log();
                    var BankId = readlineSync.question("Enter the id of the bank you are applying to for KYC Verification: ");
                    if(currUser.updated === 0){
                        KYCVerificationBlockchain.createBlock(currUser,BankId,KYCVerificationBlockchain.generatePublicHash(currUser.uid));
                        console.log();
                        console.log("Verification Successful !!");
                    }else{
                        KYCVerificationBlockchain.verifyTransaction(currUser.uid,BankId);
                    }
                }else if(x == 3){
                    var recoveryKey = readlineSync.question("Enter your recovery key: ");
                    if(recoveryKey == currUser.recoveryKey){
                        console.log("Enter new details");
                        KYCVerificationBlockchain.userList.updateUser(userId);
                        console.log("User details successfully updated !!");
                    }else{
                        console.log("Wrong recovery key, Try again!!");
                    }
                }else{
                    console.log("Enter a valid option !!");
                }
            }else if(num == 3){
                console.log();
                console.log(KYCVerificationBlockchain.chain);
                console.log();
            }else{
                console.log("Please enter a valid option !!");
            }
        }
    }
}

const test = new Test();
test.test();
