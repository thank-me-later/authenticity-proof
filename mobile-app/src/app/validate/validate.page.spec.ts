import { fakeAsync, flush } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateService } from '../validate.service';
import { NfcService } from './nfc.service';
import { ValidatePage } from './validate.page';


describe('ValidatePage', () => {
  let component: ValidatePage;
  let mockActivatedPage: ActivatedRoute = {
    params: new Observable(observer => {
      observer.next({
        id: 'test'
      });
      observer.complete();
    })
  } as ActivatedRoute;
  let mockNfcService: NfcService;
  let mockValidateService: ValidateService

  beforeEach(() => {
    mockNfcService = jasmine.createSpyObj('MockNfcService', {
      addNfcListener: new Observable(observer => {
        observer.next('test');
        observer.complete();
      }),
      writeToTag: new Observable(observer => {
        observer.next(true);
        observer.complete();
      })
    });
    mockValidateService = jasmine.createSpyObj('MockValidateService', {
      generateRandom: '1234'
    })
    component = new ValidatePage(mockActivatedPage, mockNfcService, mockValidateService);
  });

  it('should set the header based on page param', fakeAsync(() => {
    component.ngOnInit();
    flush();
    expect(component.collectionName).toEqual('test');
  }));

  it('should init the listener on init', fakeAsync(() => {
    component.ngOnInit();
    flush();
    expect(mockNfcService.addNfcListener).toHaveBeenCalled();
  }));

  it('should init the listener on init', fakeAsync(() => {
    component.writeRandomMessageToTag();
    expect(mockNfcService.writeToTag).toHaveBeenCalledWith('1234');
  }));
});
