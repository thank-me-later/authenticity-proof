import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private _web3: Web3;
  constructor() {
    this._web3 = new Web3('https://api.infura.io/v1/jsonrpc/ropsten')
  }

  getCollectionContract(address) {
    // const myContract = new this._web3.eth.Contract(abi, address, {
    //   from: '0x1234567890123456789012345678901234567891', // default from address
    //   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    // });
  }

  getAddressByENSName(name) {
    return this._web3.eth.ens.getAddress(name);
  }

}
