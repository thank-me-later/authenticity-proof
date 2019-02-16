import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.collectionList = ['Hello', 'World'];
    component.filteredCollectionList = component.collectionList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for collection', () => {
    component.onChange('hel');
    expect(component.filteredCollectionList).toEqual(['Hello']);
    component.onChange('rld');
    expect(component.filteredCollectionList).toEqual(['World']);
    component.onChange('');
    expect(component.filteredCollectionList).toEqual(['Hello', 'World']);
  });

  it('should generate a filter string', () => {
    expect(component.getFilterString()).toBeUndefined();
    component.onChange('wo');
    expect(component.getFilterString()).toEqual('(1/2)');
  });
});
