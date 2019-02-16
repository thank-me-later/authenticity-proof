import { NgModule } from '@angular/core';
import { LocalizationPipe } from './localization.pipe';
import { LocalizationService } from './localization.service';

@NgModule({
  declarations: [
    LocalizationPipe
  ],
  exports: [
    LocalizationPipe
  ],
  providers: [
    LocalizationService
  ]
})
export class LocalizationModule { }
