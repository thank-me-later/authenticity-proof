import { inject, TestBed } from '@angular/core/testing';
import metacoin_artifacts from '../../../build/contracts/MetaCoin.json';
import { Web3Service } from './web3.service';
const Web3 = require('web3');



declare let window: any;

xdescribe('Web3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3Service]
    });
  });

  it('should be created', inject([Web3Service], (service: Web3Service) => {
    expect(service).toBeTruthy();
  }));

  it('should inject a default web3 on a contract', inject([Web3Service], (service: Web3Service) => {
    service.bootstrapWeb3();

    return service.artifactsToContract(metacoin_artifacts).then((abstraction) => {
      expect(abstraction.currentProvider.host).toBe('http://localhost:8545');
    });
  }));

  it('should inject a the window web3 on a contract', inject([Web3Service], (service: Web3Service) => {
    window.web3 = {
      currentProvider: new Web3.providers.HttpProvider('http://localhost:1337')
    };

    service.bootstrapWeb3();

    return service.artifactsToContract(metacoin_artifacts).then((abstraction) => {
      expect(abstraction.currentProvider.host).toBe('http://localhost:1337');
    });
  }));
});
