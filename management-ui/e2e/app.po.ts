import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(true);
    return browser.get('/');
  }

  getHeader() {
    return element(by.css('mat-toolbar')).getText();
  }

  createNew() {
    return element(by.id('create-collection')).click();
  }
}
