import { Web3Service } from '../../util/web3.service';
import { CollectionDomainRegistryService } from './collection-domain-registry.service';


describe('CollectionDomainRegistryService', () => {
  let service: CollectionDomainRegistryService;
  let mockWeb3Service: Web3Service;
  let mockContractInstance;

  beforeEach(() => {
    mockContractInstance = {
      methods: {
        collectionDomains: () => {
          return {
            call: jasmine.createSpy('call()').and.returnValue(Promise.resolve('thankmelater.test'))
          }
        }
      },
      addDomain: jasmine.createSpy('addDomain()').and.returnValue(Promise.resolve('raw'))
    };
    mockWeb3Service = jasmine.createSpyObj('MockWeb3Service', {
      getAddressByEnsName: Promise.resolve('0x123'),
      getContract: Promise.resolve(mockContractInstance),
      sendTransaction: Promise.resolve()
    });
    service = new CollectionDomainRegistryService(mockWeb3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
