const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");
const hexToBinary = require("hex-to-binary");

class Block {
    constructor({ timeStamp: timeStamp, prevHash: prevHash, hash: hash, transaction, nonce: nonce, difficulty: difficulty }) {
        this.timeStamp = timeStamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.transaction = transaction;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis() {
        return new Block(GENESIS_DATA);
    }
    static mineBlock({ prevBlock, transaction }) {
        let timeStamp, hash;
        var difficulty = prevBlock.difficulty;
        const prevHash = prevBlock.hash;
        let nonce = 0;
        do {
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: prevBlock, timeStamp: timeStamp });
            hash = cryptoHash(timeStamp, prevHash, transaction, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
        return new Block({
            timeStamp: timeStamp,
            prevHash: prevHash,
            hash: hash,
            transaction: transaction,
            nonce: nonce,
            difficulty: difficulty
        })
    }
    static adjustDifficulty({ originalBlock, timeStamp }) {
        const { difficulty } = originalBlock;
        const difference = timeStamp - originalBlock.timeStamp;
        if (difficulty < 1) {
            return 1;
        }
        if (difference > MINE_RATE) {
            return difficulty - 1;
        } else {
            return difficulty + 1;
        }
    }
}

module.exports = Block;
