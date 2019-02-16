import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
/*
 *  MOCK CLASS
 * Only used in browser case to mock nfc 
 */
@Injectable({
  providedIn: 'root'
})
export class NfcService {

  private _nfcListenerMock: Subject<string> = new Subject();

  constructor() { }

  addNfcListener(): Observable<string> {
    setTimeout(() => {
      this._nfcListenerMock.next('pub key');
    }, 2000);
    return this._nfcListenerMock;
  }

  writeToTag(message: string): Observable<boolean> {
    return new Observable(observer => {
      observer.next(true);
      setTimeout(() => {
        this._nfcListenerMock.next('presigned:' + message);
      }, 2000);
      observer.complete();
    });
  }
}
