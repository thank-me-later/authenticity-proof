import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidateService } from '../validate.service';
import { NfcService } from './nfc.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss'],
})
export class ValidatePage implements OnInit {

  public collectionName: string = "";

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

    this._nfcService.addNfcListener()
      .subscribe(
        msg => {
          console.log(msg);
        }
      );
  }

  write() {
    this._nfcService.writeToTag(this._validateService.generateRandom())
      .subscribe(success => {
        if (success) {
          console.log('Message written successfully');
        } else {
          console.log('Failed writing message');
        }
      });
  }

}
