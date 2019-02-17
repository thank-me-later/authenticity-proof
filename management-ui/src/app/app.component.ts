import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { from } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CollectionEditorComponent } from './collection-editor/collection-editor.component';
import { CollectionRegistryService } from './collection-editor/collection-registry.service';
import { CollectionDomainRegistryService } from './common/domain/collection-domain-registry.service';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { Web3Service } from './util/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public domains: Array<string> = [];

  constructor(
    private _dialog: MatDialog,
    private _appService: CollectionRegistryService,
    private _domainRegistryService: CollectionDomainRegistryService,
    private _web3Service: Web3Service,
  ) { }

  ngOnInit() {
    window.addEventListener('load', (event) => {
      this.refreshDomains();
    });

  }

  refreshDomains() {
    this._domainRegistryService.getAllDomains()
      .then(result => this.domains = result);
  }

  launchCollectionEditor() {
    let ensname;
    this._dialog.open(CollectionEditorComponent, {
      width: '400px'
    })
      .afterClosed()
      .pipe(
        filter(raw => !!raw),
        tap(raw => ensname = raw.name.replace(/\s/ig, '')),
        switchMap(raw => from(this._appService.deployContract(raw.name, raw.maxItems, [raw.maintainer]))),
        // can also be done in separate steps. Would be normally a task of the registrar
        switchMap(instance => from(this._web3Service.registerEnsDomain(ensname, instance.options.address))),
        switchMap(result => from(this._domainRegistryService.addDomain(result))),
      )
      .subscribe(result => {
        console.log(result);
      });
  }

  addItem(ensname) {
    this._dialog.open(ItemEditorComponent, {
      width: '400px'
    })
      .afterClosed()
      .pipe(
        filter(raw => !!raw),
        switchMap(raw => from(this._appService.addItem(ensname, raw.address, raw.identifier, raw.metadata))
        )
      )
      .subscribe(result => {
        console.log(result);
      });
  }
}
