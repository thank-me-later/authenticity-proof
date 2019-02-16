import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter, switchMap } from 'rxjs/operators';
import { CollectionEditorComponent } from './collection-editor/collection-editor.component';
import { AppService } from './app.service';
import { from } from 'rxjs';
import { Web3Service } from './util/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _dialog: MatDialog,
    private _appService: AppService,
    private _web3Service: Web3Service,
  ) { }

  launchCollectionEditor() {
    this._dialog.open(CollectionEditorComponent, {
      width: '400px'
    })
      .afterClosed()
      .pipe(
        filter(raw => !!raw),
        switchMap(raw => from(this._appService.deployContract(raw.name, raw.maxItems, ['0x51ea7a1338Ee41af3Df71F345Df80c5002c12d78'])))
      )
      .subscribe(instance => {
        console.log(instance);
      })
  }

  getAddressByEnsName() {
    this._web3Service.getAddressByEnsName('hallowelt.test').then(res => console.log(res));
  }
  
  registerEnsName() {
    this._web3Service.registerEnsDomain('hallowelten.test', '0x99d60b3c64D1Af4E11e33196e9578622b2a68381').then(res => console.log(res))
  }
}
