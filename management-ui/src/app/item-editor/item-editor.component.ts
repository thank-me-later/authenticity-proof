import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {

  public itemForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ItemEditorComponent>
  ) { }

  ngOnInit() {
    this.itemForm = this._formBuilder.group({
      'address': ['', Validators.required],
      'identifier': ['', Validators.required],
      'metadata': [''],
    });
  }

  cancel() {
    this._dialogRef.close();
  }

  create() {
    this._dialogRef.close(this.itemForm.getRawValue());
  }

}
