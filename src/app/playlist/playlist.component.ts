import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayItem } from '../playlist-item/playItem';
import { ProgressService } from '../progress.service';
import { FetchService } from '../fetch.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlayListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  playlist: [PlayItem];
  currentPlaying: string;

  constructor(private progressService: ProgressService, private fetchService: FetchService,
              private scrollToService: ScrollToService) {
  }

  ngOnInit() {
    this.progressService.show();
    this.subscription = Observable.combineLatest(
      this.fetchService.fetchPlaylist(),
      this.fetchService.fetchStatusCurrentPlaying(),
      (playlist, currentPlaying) => [playlist, currentPlaying]
    ).subscribe(pair => {
      this.progressService.hide();
      this.playlist = pair[0] as [PlayItem];
      this.currentPlaying = pair[1] as string;
      if (this.currentPlaying) {
        this.scrollToService.scrollTo({
          target: this.currentPlaying
        });
      }
    }, error => console.log(error));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
