import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-collection-editor',
  templateUrl: './collection-editor.component.html',
  styleUrls: ['./collection-editor.component.scss']
})
export class CollectionEditorComponent implements OnInit {

  public collectionForm: FormGroup;
  public availableMaintainers: Array<any> = [{
    label: 'Julian',
    address: '0xFb43318088588a4cb9Bd172b54C0B1c0F328570B'
  }, {
    label: 'Nandan',
    address: '0xDdc510846eDEa77c69830E67c4a088fA78a347be'
  }, {
    label: 'Marco',
    address: '0x9b55a8896710ABdC1928cA8704A259057DD1F643'
  }, {
    label: 'Jan-Patrick',
    address: '0xc3919677EF501143A39F28d9d120b1894C30cA74'
  }];

  constructor(
    private _dialogRef: MatDialogRef<CollectionEditorComponent>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.collectionForm = this._formBuilder.group({
      'name': ['', Validators.required],
      'hasLimit': [false],
      'maxItems': [0],
      'maintainer': []
    });
  }

  isLimitInputDisabled() {
    return this.collectionForm.get('hasLimit').value;
  }

  cancel() {
    return this._dialogRef.close();
  }

  create() {
    return this._dialogRef.close(this.collectionForm.getRawValue());
  }

}
