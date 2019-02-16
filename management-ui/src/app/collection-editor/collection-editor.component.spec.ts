import { async, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionEditorComponent } from './collection-editor.component';
import { CollectionEditorModule } from './collection-editor.module';


describe('CollectionEditorComponent', () => {
  let component: CollectionEditorComponent;
  let MockMatDialogRef: MatDialogRef<CollectionEditorComponent> = jasmine.createSpyObj('MockMatDialogRef', ['close']);

  beforeEach(async(() => {

  }));

  beforeEach(() => {

  });

  it('should create', async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CollectionEditorModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: MockMatDialogRef }
      ]
    })
      .compileComponents();
    let fixture = TestBed.createComponent(CollectionEditorComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));
});
