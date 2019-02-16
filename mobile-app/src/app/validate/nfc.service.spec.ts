import { fakeAsync, flush } from '@angular/core/testing';
import { NfcService } from './nfc.service';

declare global {
  interface Window {
    nfc: any;
    ndef: any;
  }
}

describe('NfcService', () => {
  let service: NfcService;
  beforeEach(() => {
    window.nfc = jasmine.createSpyObj('mockNfc', ['addNdefListener', 'write']);
    window.ndef = jasmine.createSpyObj('mockNfc', ['textRecord']);
    service = new NfcService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add the nfc listener', fakeAsync(() => {
    service.addNfcListener()
      .subscribe();
    flush();
    expect(window.nfc.addNdefListener).toHaveBeenCalled();
  }));

  it('should write to nfc', () => {
    service.writeToTag('test')
      .subscribe();
    expect(window.ndef.textRecord).toHaveBeenCalledWith('test');
    expect(window.nfc.write).toHaveBeenCalled();
  });
});
