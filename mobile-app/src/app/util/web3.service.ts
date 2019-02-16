import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { collectionRegistryAbi } from '../../../../contractAbi';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private _web3: Web3;
  constructor() {
    this._web3 = new Web3('https://api.infura.io/v1/jsonrpc/ropsten')
  }

  getCollectionContract(address, publicKey) {
    const CollectionRegistryContract = new this._web3.eth.Contract(collectionRegistryAbi, address);
    return CollectionRegistryContract.methods.checkItem(publicKey).call();
  }

  getAddressByENSName(name) {
    return this._web3.eth.ens.getAddress(name);
  }

}
