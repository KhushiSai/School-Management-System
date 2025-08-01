import CryptoJS from 'crypto-js';
import { Block, FeeTransaction } from '../types';

export class Blockchain {
  private chain: Block[] = [];
  private difficulty = 2;

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    const genesisTransaction: FeeTransaction = {
      id: 'genesis',
      studentId: 'genesis',
      amount: 0,
      type: 'tuition',
      status: 'completed',
      date: new Date().toISOString(),
      blockchainHash: '',
      description: 'Genesis Block'
    };

    return {
      index: 0,
      timestamp: Date.now(),
      data: genesisTransaction,
      previousHash: '0',
      hash: this.calculateHash(0, Date.now(), genesisTransaction, '0', 0),
      nonce: 0
    };
  }

  calculateHash(index: number, timestamp: number, data: FeeTransaction, previousHash: string, nonce: number): string {
    return CryptoJS.SHA256(index + timestamp + JSON.stringify(data) + previousHash + nonce).toString();
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  mineBlock(block: Block): void {
    const target = Array(this.difficulty + 1).join('0');
    
    while (block.hash.substring(0, this.difficulty) !== target) {
      block.nonce++;
      block.hash = this.calculateHash(block.index, block.timestamp, block.data, block.previousHash, block.nonce);
    }
  }

  addTransaction(transaction: FeeTransaction): string {
    const latestBlock = this.getLatestBlock();
    const newBlock: Block = {
      index: latestBlock.index + 1,
      timestamp: Date.now(),
      data: transaction,
      previousHash: latestBlock.hash,
      hash: '',
      nonce: 0
    };

    newBlock.hash = this.calculateHash(newBlock.index, newBlock.timestamp, newBlock.data, newBlock.previousHash, newBlock.nonce);
    this.mineBlock(newBlock);
    this.chain.push(newBlock);

    return newBlock.hash;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(currentBlock.index, currentBlock.timestamp, currentBlock.data, currentBlock.previousHash, currentBlock.nonce)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  getChain(): Block[] {
    return this.chain;
  }
}

export const schoolBlockchain = new Blockchain();