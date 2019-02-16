import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public collectionList: Array<string> = ['Rolex Limited Editon 100', 'Rolex Black Edition'];
  public filteredCollectionList: Array<string> = this.collectionList;

  onChange(search: string) {
    if (search) {
      this.filteredCollectionList = this.collectionList.filter(item => item.toLowerCase().includes(search.toLowerCase()));
    } else {
      this.filteredCollectionList = this.collectionList;
    }
  }
}
