import { async, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CollectionRegistryService } from './collection-editor/collection-registry.service';
import { Web3Service } from './util/web3.service';


describe('AppComponent', () => {
  let component: AppComponent;
  let mockDialog: MatDialog;
  let rawResult = {
    name: 'test',
    hasLimit: false
  };
  let mockAppService: CollectionRegistryService;
  let mockWeb3Service: Web3Service;
  let mockContractInstance;

  beforeEach(() => {
    const mockDialogRef = {
      afterClosed: () => {
        return new Observable(observer => {
          observer.next(rawResult);
          observer.complete();
        })
      }
    };
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
    mockDialog = jasmine.createSpyObj('MockMatDialog', {
      open: mockDialogRef
    });
    mockAppService = jasmine.createSpyObj('MockAppService', {
      deployContract: Promise.resolve()
    });
    mockWeb3Service = jasmine.createSpyObj('MockWeb3Service', {
      deployContract: Promise.resolve(),
      getAddressByEnsName: Promise.resolve('0x123'),
      getContract: Promise.resolve(mockContractInstance)
    });
    //component = new AppComponent(mockDialog, mockAppService, , mockWeb3Service);
  });

  it('should create', async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppModule
      ],
      providers: [
        { provide: Web3Service, useValue: mockWeb3Service }
      ]
    })
      .compileComponents();
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));
});
