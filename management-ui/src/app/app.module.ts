import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CollectionEditorModule } from './collection-editor/collection-editor.module';
import { LocalizationModule } from './common/localization/localization.module';
import { AppService } from './app.service';
import { Web3Service } from './util/web3.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    CollectionEditorModule,
    LocalizationModule
  ],
  providers: [
    AppService,
    Web3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
