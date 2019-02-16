import { Injectable } from '@angular/core';
import { localeDE } from './locales/locale.de.js';
import { localeEN } from './locales/locale.en.js';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private _locale: string = 'en';
  private readonly DEFAULT_LOCALE: string = 'en';
  private _availableLocales = {};

  constructor() {
    this._availableLocales['de'] = localeDE;
    this._availableLocales['en'] = localeEN;
  }

  setLocale(locale) {
    if (this._availableLocales[locale]) {
      this._locale = locale;
    } else {
      throw new Error('Locale is not supported');
    }
  }

  getLocalizedString(value) {
    return this._availableLocales[this._locale][value] ||
      this._availableLocales[this.DEFAULT_LOCALE][value] ||
      value
  }
}
