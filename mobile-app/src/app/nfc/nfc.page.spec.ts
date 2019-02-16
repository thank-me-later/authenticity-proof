import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Ndef, NFC } from '@ionic-native/nfc/ngx';
import { Observable } from 'rxjs';
import { NfcPage } from './nfc.page';


describe('NfcPage', () => {
  let component: NfcPage;
  let mockActivatedPage: ActivatedRoute = {
    params: new Observable(observer => {
      observer.next({
        id: 'test'
      });
      observer.complete();
    })
  } as ActivatedRoute;
  let mockNfc: NFC;
  let mockNdef: Ndef;

  beforeEach(() => {
    //window.nfc = mockNfc;
    //component = new NfcPage(mockActivatedPage);
  });

  it('should create', async(() => {
    // TestBed.configureTestingModule({
    //   declarations: [NfcPage],
    //   providers: [
    //     { provide: ActivatedRoute, useValue: mockActivatedPage },
    //     { provide: NFC, useValue: mockNfc },
    //     { provide: Ndef, useValue: mockNdef }
    //   ],
    //   schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // })
    //   .compileComponents();
    // let fixture = TestBed.createComponent(NfcPage);
    // fixture.detectChanges();
    // expect(fixture.componentInstance).toBeTruthy();
  }));

  // it('should set the header based on page param', fakeAsync(() => {
  //   component.ngOnInit();
  //   flush();
  //   expect(component.collectionName).toEqual('test');
  // }));
});
