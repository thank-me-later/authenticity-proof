import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';
import { CollectionEditorComponent } from './collection-editor/collection-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private _dialog: MatDialog
  ) { }

  launchCollectionEditor() {
    this._dialog.open(CollectionEditorComponent, {
      width: '400px'
    })
      .afterClosed()
      .pipe(
        filter(raw => !!raw)
      )
      .subscribe(raw => {
        console.log(raw);
      })
  }
}
