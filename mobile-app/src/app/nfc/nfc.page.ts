import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare const nfc;
declare const ndef;

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage implements OnInit {

  public collectionName: string = "";
  public messages: Array<string> = ["ready"];

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activatedRoute.params
      .subscribe(
        params => {
          this.collectionName = params.id;
        }
      );

    this.messages.push('Start Lisnener');
    nfc.addNdefListener(event => {
      this.messages.push('received', nfc.bytesToString(event.tag.ndefMessage[0].payload))
    }, (status) => {
      this.messages.push('Listening' + JSON.stringify(status));
    }, error => {
      this.messages.push(JSON.stringify(error));
    });
  }

  write() {
    // this.messages.push('TAG' + JSON.stringify(nfcEvent.tag));
    const entries = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomMsg = [];
    randomMsg.length = 10;
    randomMsg
      .map(() => {
        const random = Math.round(Math.random() * (entries.length - 1));
        return entries[random];
      })
      .join('');
    this.messages.push(`Write message ${randomMsg} to tag`);
    let message = ndef.textRecord(randomMsg);
    nfc.write(
      [message],
      () => {
        this.messages.push('Message written');
      }, err => {
        this.messages.push('Error', JSON.stringify(err))
      });
  }

}
