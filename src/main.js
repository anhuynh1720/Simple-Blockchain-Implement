const { timingSafeEqual } = require('crypto');
const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '' ) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransaction = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("01/01/2022", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransaction(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransaction);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransaction = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let coin = new Blockchain();

console.log("Mining block 1...");

coin.addBlock(new Block(1, "01/01/2022", {amount: 4}));

console.log("Mining block 2...");

coin.addBlock(new Block(2, "11/01/2022", {amount: 10}));
