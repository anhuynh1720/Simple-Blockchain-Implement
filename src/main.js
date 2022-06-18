let coin = new Blockchain();
coin.createTransaction(new Transaction('address1', 'address2', 100));
coin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\nStarting the miner....');
coin.minePendingTransaction('my-address');

console.log('Balance of my wallet is: ', coin.getBalanceOfAddress('my-address'));

console.log('\nStarting the miner again....');
coin.minePendingTransaction('my-address');

console.log('Balance of my wallet is: ', coin.getBalanceOfAddress('my-address'));