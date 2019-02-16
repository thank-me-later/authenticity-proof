import { fakeAsync, flush } from '@angular/core/testing';
import { Web3Service } from './util/web3.service';
import { ValidateService } from './validate.service';


describe('ValidateService', () => {
  let service: ValidateService;
  let mockWeb3Service: Web3Service;

  beforeEach(() => {
    mockWeb3Service = jasmine.createSpyObj('MockWeb3Service', {
      getAddressByENSName: Promise.resolve('0x123'),
      getCollectionContract: Promise.resolve(true)
    });
    service = new ValidateService(mockWeb3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return for generate random', () => {
    expect(service.generateRandom()).toEqual('thankmelater!');
  });

  it('should validate a public key', fakeAsync(() => {
    service.validatePublicKey('hallowelt.test', 'publickey')
      .then(result => {
        expect(result).toBeTruthy();
      });
    flush();
    expect(mockWeb3Service.getAddressByENSName).toHaveBeenCalledWith('hallowelt.test');
    expect(mockWeb3Service.getCollectionContract).toHaveBeenCalledWith('0x123', 'publickey');
  }));
});
