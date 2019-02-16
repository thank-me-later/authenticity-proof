import { AppPage } from './app.po';
import { CollectionEditorPage } from './collection-editor.e2e-spec';

describe('angular-truffle-box App', () => {
  let page: AppPage;
  let collectionEditor: CollectionEditorPage;

  beforeEach(() => {
    page = new AppPage();
    collectionEditor = new CollectionEditorPage();
  });

  it('should display home page', done => {
    page.navigateTo();
    expect(page.getHeader()).toContain('thank me later! - Manager')
      .then(() => done());
  });

  it('should create new', done => {
    page.createNew()
      .then(() => collectionEditor.isVisible())
      .then(() => done());
  });
});
