import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
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

  beforeEach(() => {
    component = new NfcPage(mockActivatedPage);
  });

  it('should create', async(() => {
    TestBed.configureTestingModule({
      declarations: [NfcPage],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedPage }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    let fixture = TestBed.createComponent(NfcPage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));

  it('should set the header based on page param', fakeAsync(() => {
    component.ngOnInit();
    flush();
    expect(component.collectionName).toEqual('test');
  }));
});
