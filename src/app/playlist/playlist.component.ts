import { Component, OnInit } from '@angular/core';
import { PlayItem } from '../playlist-item/playItem';
import { ProgressService } from '../progress.service';
import { FetchService } from '../fetch.service';
import { Observable } from 'rxjs/Observable';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlayListComponent implements OnInit {

  playlist: Observable<[PlayItem]>;
  currentPlaying: Observable<string>;

  constructor(private progressService: ProgressService, private fetchService: FetchService,
              private scrollToService: ScrollToService) {
  }

  ngOnInit() {
    this.progressService.show();
    this.playlist = this.fetchService.fetchPlaylist()
      .do(() => this.progressService.hide());
    this.currentPlaying = this.fetchService.fetchStatusCurrentPlaying()
      .do(currentPlaying => {
        console.log('playing');
        if (currentPlaying) {

          console.log('playing 2');
          this.scrollToService.scrollTo({
            target: currentPlaying
          });
        }
      });
  }

}
