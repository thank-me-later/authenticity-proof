import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionEditorComponent } from './collection-editor.component';
import { CollectionEditorModule } from './collection-editor.module';


describe('CollectionEditorComponent', () => {
  let component: CollectionEditorComponent;
  let mockMatDialogRef: MatDialogRef<CollectionEditorComponent>;
  let mockFromBuilder: FormBuilder;
  let mockFromGroup: FormGroup;
  let rawValue = {
    name: 'hello',
    hasLimit: false
  };

  beforeEach(() => {
    mockFromGroup = jasmine.createSpyObj('MockFormGroup', {
      'getRawValue': rawValue
    });
    mockMatDialogRef = jasmine.createSpyObj('MockMatDialogRef', ['close']);
    mockFromBuilder = jasmine.createSpyObj('MockFormBuilder', {
      'group': mockFromGroup
    });
    component = new CollectionEditorComponent(mockMatDialogRef, mockFromBuilder);
    component.ngOnInit();
  });

  it('should create', async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CollectionEditorModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef }
      ]
    })
      .compileComponents();
    let fixture = TestBed.createComponent(CollectionEditorComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));

  it('should cancel the editor', () => {
    component.cancel();
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should close and return raw value', () => {
    component.create();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(rawValue);
  });
});
