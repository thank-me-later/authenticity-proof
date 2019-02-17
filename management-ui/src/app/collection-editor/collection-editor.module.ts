import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { LocalizationModule } from '../common/localization/localization.module';
import { CollectionEditorComponent } from './collection-editor.component';

@NgModule({
  declarations: [CollectionEditorComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    LocalizationModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    CollectionEditorComponent
  ],
  entryComponents: [
    CollectionEditorComponent
  ]
})
export class CollectionEditorModule { }
