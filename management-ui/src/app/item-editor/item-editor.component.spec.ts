import { async, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ItemEditorComponent } from './item-editor.component';
import { ItemEditorModule } from './item-editor.module';


describe('ItemEditorComponent', () => {
  let component: ItemEditorComponent;
  let mockMatDialogRef: MatDialogRef<ItemEditorComponent>;
  let mockFromBuilder: FormBuilder;

  beforeEach(() => {
    mockMatDialogRef = jasmine.createSpyObj('MockMatDialogRef', ['close']);
    mockFromBuilder = jasmine.createSpyObj('MockFormBuilder', [''])
    component = new ItemEditorComponent(mockFromBuilder, mockMatDialogRef);
  });


  it('should create', async(() => {
    TestBed.configureTestingModule({
      imports: [
        ItemEditorModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef }
      ]
    })
      .compileComponents()
    let fixture = TestBed.createComponent(ItemEditorComponent);
    ;
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));
});
