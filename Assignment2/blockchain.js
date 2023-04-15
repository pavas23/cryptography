const Block = require("./block");
const { user, userList } = require("./user");
const cryptoHash = require('./crypto-hash');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
        this.userList = new userList();
        this.userList.addToHashAllUsers();
    }
    createBlock(user, Bid, transaction) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            transaction: transaction,
        });
        this.chain.push(newBlock);
        var blockHashArray = this.userList.uidBlockHashMap.get(user.uid);
        blockHashArray.push(newBlock.hash);
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
    verifyTransaction(uid, Bid) {
        const privateHash = this.userList.uidPrivateHashMap.get(uid);
        var recoveryKey;
        for (var user of this.userList.list) {
            if (user.uid === uid) {
                recoveryKey = user.recoveryKey;
                break;
            }
        }
        const hashData = privateHash + recoveryKey;
        var publicHash = cryptoHash(hashData);
        for (var i = 0; i < 5; i++) {
            hashData = publicHash + recoveryKey;
            publicHash = cryptoHash(hashData);
        }
        var KYCVerified = false;
        for (let block of this.chain) {
            if (block.transaction === publicHash) {
                KYCVerified = true;
                break;
            }
        }
        if (KYCVerified) {
            var userTemp;
            for (var u of userList.list) {
                if (u.uid == uid) {
                    userTemp = u;
                    break;
                }
            }
            this.createBlock(userTemp, Bid, publicHash);
        } else {
            console.error("KYC Verification unsuccessfull !!");
        }
        return KYCVerified;
    }
    viewUser(user) {
        var tempArr = this.userList.uidBlockHashMap.get(user.uid);
        for (var block of this.chain) {
            if (block.hash in tempArr) {
                console.log(block);
            }
        }
    }
};

module.exports = Blockchain;
