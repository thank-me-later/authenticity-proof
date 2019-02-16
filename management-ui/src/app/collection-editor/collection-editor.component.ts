import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-collection-editor',
  templateUrl: './collection-editor.component.html',
  styleUrls: ['./collection-editor.component.scss']
})
export class CollectionEditorComponent implements OnInit {

  public limitSelector: string;
  public collectionForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<CollectionEditorComponent>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.collectionForm = this._formBuilder.group({
      'name': ['', Validators.required],
      'hasLimit': [false]
    });
  }

  isLimitInputDisabled() {
    return this.limitSelector === '1';
  }

  cancel() {
    return this._dialogRef.close();
  }

  create() {
    return this._dialogRef.close(this.collectionForm.getRawValue());
  }

}
