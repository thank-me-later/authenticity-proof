import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public collectionList: Array<string> = ['Rolex Limited Editon 100', 'Rolex Black Edition'];
  public filteredCollectionList: Array<string> = this.collectionList;

  constructor(
    public navCtrl: NavController
  ) { }

  onChange(search: string) {
    if (search) {
      this.filteredCollectionList = this.collectionList.filter(item => item.toLowerCase().includes(search.toLowerCase()));
    } else {
      this.filteredCollectionList = this.collectionList;
    }
  }

  getFilterString() {
    if (this.collectionList.length != this.filteredCollectionList.length) {
      return `(${this.filteredCollectionList.length}/${this.collectionList.length})`;
    }
  }

  switchNfcPage(collection: string) {
    this.navCtrl.navigateForward(['nfc', collection]);
  }
}
