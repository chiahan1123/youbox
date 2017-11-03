import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PlayItem } from '../playlist-item/playItem';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

  item: PlayItem;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<PreviewComponent>,
              private fetchService: FetchService) {
    this.item = data as PlayItem;
  }

  onReady(player) {
    player.playVideo();
  }

  onAdd() {
    this.fetchService.writeToPlaylist(this.item);
    this.dialogRef.close();
  }

}
