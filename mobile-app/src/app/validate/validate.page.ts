import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidateService } from '../validate.service';
import { NfcService } from './nfc.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss'],
})
export class ValidatePage implements OnInit, OnDestroy {

  public collectionName: string = "";
  public validating: boolean = false;
  public resultExit: boolean = false;
  public success: boolean = false;

  private _nfcListener;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _nfcService: NfcService,
    private _validateService: ValidateService
  ) { }

  ngOnInit() {
    this._activatedRoute.params
      .subscribe(
        params => {
          this.collectionName = params.id;
        }
      );

    this._nfcListener = this._nfcService.addNfcListener().subscribe(
      msg => {
        console.log('NFC:', msg);
        if (this.validating) {
          this.validating = false;
          this.resultExit = true;
          this.success = (msg === 'signed:thankmelater!');
        } else {
          this.validating = true;
          // todo validate
          this.writeRandomMessageToTag();
        }
      }
    );
  }

  ngOnDestroy() {
    console.log('NFC: Unsubscribe Listener');
    this._nfcListener.unsubscribe();
  }

  writeRandomMessageToTag() {
    this._nfcService.writeToTag(this._validateService.generateRandom())
      .subscribe(success => {
        if (success) {
          console.log('NFC: Message written successfully');
        } else {
          console.log('NFC: Failed writing message');
        }
      });
  }

}
