import { Injectable } from '@angular/core';
import { collectionRegistryAbi, collectionRegistryBytecode } from '../../../../contractAbi';
import { Web3Service } from '../util/web3.service';

@Injectable()
export class CollectionRegistryService {

    private CollectionRegistry: any;

    constructor(
        private _web3service: Web3Service
    ) { }

    public deployContract(name, maxItems, maintainers) {
        return this._web3service.deployContract(collectionRegistryAbi, collectionRegistryBytecode, [name, maxItems, maintainers]);
    }

    public getContract(address) {
        return this._web3service.getContract(collectionRegistryAbi, address);
    }

    public addItem(ensname, itemAddress, identifier, metaInfo) {
        return this._web3service.getSubdomainAddress(ensname)
            .then(address => {
                return this._web3service.getContract(collectionRegistryAbi, address)
            })
            .then(instance => this._web3service.sendTransaction(instance.methods.addItem(itemAddress, identifier, metaInfo)));
    }
}