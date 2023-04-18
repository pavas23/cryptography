const Block = require("./block");
const { user, userList } = require("./user");
const {bankList,Bank} = require("./bank");
const cryptoHash = require('./crypto-hash');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
        this.userList = new userList();
        this.bankList = new bankList();
        this.userList.addToHashAllUsers();
    }
    createBlock(user, Bid, transaction) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            transaction: transaction,
        });
        this.chain.push(newBlock);
        if(this.userList.uidBlockHashMap.has(user.uid) == false){
            this.userList.uidBlockHashMap.set(user.uid,[]);
        }
        this.userList.uidBlockHashMap.get(user.uid).push(newBlock.hash);
        user.bid.push(Bid);
        return;
    }
    static isValidChain(chain) {
        // as chain[0] and Block.genesis() are two different instances of Block there memeory location will not match so compare the string data
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            const { timeStamp, prevHash, hash, transaction, nonce, difficulty } = chain[i];
            const prevHashOriginal = chain[i - 1].hash;
            if (prevHashOriginal !== prevHash) {
                return false;
            }
            if (hash !== cryptoHash(timeStamp, prevHash, transaction, nonce, difficulty)) {
                return false;
            }
            if (Math.abs(difficulty - chain[i - 1].difficulty) > 1) {
                return false;
            }
        }
        return true;
    }
    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error("The incoming chain is not longer than actual chain!");
            return;
        }
        if (!Blockchain.isValidChain(chain)) {
            console.error("The incoming chain is not valid!");
            return;
        }
        this.chain = chain;
    }
    generatePublicHash(uid){
        const privateHash = this.userList.uidPrivateHashMap.get(uid);
        var recoveryKey;
        for (var user of this.userList.list) {
            if (user.uid === uid) {
                recoveryKey = user.recoveryKey;
                break;
            }
        }
        var hashData = privateHash + recoveryKey;
        var publicHash = cryptoHash(hashData);
        for (var i = 0; i < 5; i++) {
            hashData = publicHash + recoveryKey;
            publicHash = cryptoHash(hashData);
        }
        return publicHash;
    }
    verifyTransaction(uid, Bid) {
        var publicHash = this.generatePublicHash(uid);
        var KYCVerified = false;
        for (let block of this.chain) {
            if (block.transaction === publicHash) {
                KYCVerified = true;
                break;
            }
        }
        if (KYCVerified) {
            var userTemp;
            for (var u of this.userList.list) {
                if (u.uid == uid) {
                    userTemp = u;
                    break;
                }
            }
            this.createBlock(userTemp, Bid, publicHash);
            console.log("KYC verification successfull!! ");
        } else {
            console.error("KYC Verification unsuccessfull !!");
        }
    }
    viewUser(user) {
        var tempArr = this.userList.uidBlockHashMap.get(user.uid);
        if(tempArr.length == 0){
            console.log();
            console.log("No transactions!!");
            return;
        }
        for (var block of this.chain) {
            if (tempArr.includes(block.hash)) {
                console.log(block);
            }
        }
    }
};

module.exports = {
    Blockchain:Blockchain,
};
