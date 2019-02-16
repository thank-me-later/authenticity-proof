import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare const nfc;
declare const ndef;

@Injectable({
  providedIn: 'root'
})
export class NfcService {

  constructor() { }

  addNfcListener(): Observable<boolean> {
    return new Observable(observer => {
      nfc.addNdefListener(event => {
        observer.next(nfc.bytesToString(event.tag.ndefMessage[0].payload));
      }, (status) => {
        console.log('Initialize', status);
      }, error => {
        observer.error(error);
      });
    });
  }

  writeToTag(message: string): Observable<boolean> {
    return new Observable(observer => {
      let encodedMsg = ndef.textRecord(message);
      nfc.write(
        [encodedMsg],
        () => {
          observer.next(true);
          observer.complete();
        }, err => {
          observer.error(err);
        });
    });
  }
}
