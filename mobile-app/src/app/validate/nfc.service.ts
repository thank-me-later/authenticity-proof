import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare const nfc;
declare const ndef;

@Injectable({
  providedIn: 'root'
})
export class NfcService {

  constructor() { }

  addNfcListener(): Observable<string> {
    return new Observable(observer => {
      nfc.addNdefListener(event => {
        const msg: string = nfc.bytesToString(event.tag.ndefMessage[0].payload);
        // remove prefix before sending
        observer.next(msg.substr(3));
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
