import { inject, TestBed } from '@angular/core/testing';
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
});
