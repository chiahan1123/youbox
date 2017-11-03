import { Component, Input } from '@angular/core';
import { PlayItem } from '../playlist-item/playItem';
import { MatDialog } from '@angular/material';
import { PreviewComponent } from '../preview/preview.component';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent {

  @Input() searchList: [PlayItem];

  constructor(private dialog: MatDialog) {
  }

  onItemClick(item: PlayItem) {
    this.dialog.open(PreviewComponent, {
      width: '60%',
      height: '70%',
      data: item
    });
  }

}
