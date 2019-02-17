import { Injectable } from '@angular/core';
import { collectionDomainRegistryAbi } from '../../../../../contractAbi';
import { environment } from '../../../environments/environment';
import { Web3Service } from '../../util/web3.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionDomainRegistryService {

  constructor(
    private _web3Service: Web3Service
  ) { }

  addDomain(domainName) {
    return this._web3Service.getAddressByEnsName(environment.topDomain)
      .then(address => {
        return this._web3Service.getContract(collectionDomainRegistryAbi, address)
      })
      .then(instance => {
        return this._web3Service.sendTransaction(instance.methods.addDomain(domainName));
      });
  }

  getAllDomains() {
    return this._web3Service.getAddressByEnsName(environment.topDomain)
      .then(address => {
        return this._web3Service.getContract(collectionDomainRegistryAbi, address)
      })
      .then(instance => {
        return instance.methods.collectionDomains().call();
      })
      .then(result => {
        if (result) {
          return result.split(',');
        } else {
          return [];
        }
      });
  }
}
