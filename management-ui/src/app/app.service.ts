import {Injectable, OnInit} from '@angular/core';
import {Web3Service} from './util/web3.service'

declare let require: any;
const CollectionRegistryArtifact = require('../../build/contracts/CollectionRegistry.json');

@Injectable()
export class AppService {

    private CollectionRegistry: any;

    constructor(
        private _web3service: Web3Service
        ) {}

    public async deployContract(name, maxItems, maintainers) {
        return await this._web3service.deployContract(CollectionRegistryArtifact.abi, CollectionRegistryArtifact.bytecode, [name, maxItems, maintainers]);
    }

    public getContract(address) {
        return this._web3service.getContract(CollectionRegistryArtifact.abi, address);
    }
}