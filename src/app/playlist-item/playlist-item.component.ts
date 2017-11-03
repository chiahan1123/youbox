import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayItem } from './playItem';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlayListItemComponent {

  @Input() playItem: PlayItem;
  @Input() darkTheme = false;
  @Input() grayBackground = false;
  @Output() bindClick = new EventEmitter<PlayItem>();

  onClick(): void {
    this.bindClick.emit(this.playItem);
  }

  getThemeClass(): string {
    if (this.darkTheme) {
      return 'play-item-container-dark';
    }
    return this.grayBackground ? 'play-item-container gray' : 'play-item-container white';
  }

}
