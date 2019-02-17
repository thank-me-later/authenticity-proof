import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizationModule } from '../common/localization/localization.module';
import { ItemEditorComponent } from './item-editor.component';

@NgModule({
  declarations: [ItemEditorComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule
  ],
  exports: [
    ItemEditorComponent
  ],
  entryComponents: [
    ItemEditorComponent
  ]
})
export class ItemEditorModule { }
