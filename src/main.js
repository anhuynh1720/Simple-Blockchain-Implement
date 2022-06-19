const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('dca4cf549ef21b129628a99525ad6f8bf7c49eb0b199f6332c5e7fd6fe91e7c2');

const myWalletAddress = myKey.getPublic('hex');

const coin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, ' public key goes here', 100);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log('\nStarting the miner...');
coin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, ' public key goes here', 50);
tx2.signTransaction(myKey);
coin.addTransaction(tx2);

console.log('\nStarting the miner...');
coin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of my wallet', coin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid: ', coin.isChainValid());