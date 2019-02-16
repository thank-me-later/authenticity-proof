import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from './localization.service';

@Pipe({ name: 'translate' })
export class LocalizationPipe implements PipeTransform {

  constructor(
    private _localizationService: LocalizationService
  ) { }

  transform(value: string): string {
    return this._localizationService.getLocalizedString(value);
  }
}