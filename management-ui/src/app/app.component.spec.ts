import { async, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


describe('AppComponent', () => {
  let component: AppComponent;
  let mockDialog: MatDialog;
  let rawResult = {
    name: 'test',
    hasLimit: false
  };

  beforeEach(() => {
    const mockDialogRef = {
      afterClosed: () => {
        return new Observable(observer => {
          observer.next(rawResult);
          observer.complete();
        })
      }
    };
    mockDialog = jasmine.createSpyObj('MockMatDialog', {
      open: mockDialogRef
    });
    component = new AppComponent(mockDialog);
  });

  it('should create', async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppModule
      ]
    })
      .compileComponents();
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));

  it('should open result and create new collection', fakeAsync(() => {
    component.launchCollectionEditor();
    flush();
    // todo check
  }));
});
