import { by, element } from 'protractor';

export class CollectionEditorPage {

  isVisible() {
    return element(by.css('app-collection-editor .mat-title')).getText()
      .then(content => {
        return expect(content).toEqual('New Collection');
      });
  }

}
