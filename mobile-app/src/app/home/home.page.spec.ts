import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { HomePage } from './home.page';


describe('HomePage', () => {
  let component: HomePage;
  let navControllerMock: NavController;

  beforeEach(() => {
    navControllerMock = jasmine.createSpyObj('MockNavController', ['navigateForward'])
    component = new HomePage(navControllerMock);
  });

  beforeEach(() => {
    component.collectionList = ['Hello', 'World'];
    component.filteredCollectionList = component.collectionList;
  });

  it('should create', async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: NavController, useValue: navControllerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    let fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));

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

  it('should navigate to nfc page', () => {
    component.switchNfcPage('test');
    expect(navControllerMock.navigateForward).toHaveBeenCalledWith(['nfc', 'test']);
  });
});
