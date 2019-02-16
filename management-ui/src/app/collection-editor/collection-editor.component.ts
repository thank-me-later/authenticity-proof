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
