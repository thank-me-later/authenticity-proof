import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  private readonly CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  constructor() { }

  generateRandom() {
    // todo - need to use fix value for now because of nfc device limitations
    // const randomMsg = [];
    // randomMsg.length = 10;
    // return randomMsg
    //   .map(() => {
    //     const random = Math.round(Math.random() * (this.CHARS.length - 1));
    //     return this.CHARS[random]
    //   })
    //   .join('');
    return "thankmelater!"
  }
}
