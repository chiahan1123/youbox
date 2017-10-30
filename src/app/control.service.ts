import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/combineLatest';

import { FetchService } from './fetch.service';
import { PlayItem } from './playlist-item/playItem';
import { Observable } from 'rxjs/Observable';

export const PlayControl = {
  NEXT: 1,
  PREVIOUS: 2,
};

@Injectable()
export class ControlService implements OnDestroy {

  private playItemSubscription: Subscription;
  private actionPlaySubscription: Subscription;
  private actionPauseSubscription: Subscription;
  private actionNextSubscription: Subscription;
  private actionPrevSubscription: Subscription;
  private actionPlusSubscription: Subscription;
  private actionMinusSubscription: Subscription;
  private actionMuteSubscription: Subscription;
  private actionOnDemandSubscription: Subscription;
  private currentPlaying: string;
  private playlist: [PlayItem];
  private loop = true;
  private playItemSubject = new Subject<PlayItem>();
  private actionPlaySubject = new Subject<void>();
  private actionPauseSubject = new Subject<void>();
  private actionVolumeSubject = new Subject<number>();

  playItemObservable = this.playItemSubject.asObservable();
  actionPlayObservable = this.actionPlaySubject.asObservable();
  actionPauseObservable = this.actionPauseSubject.asObservable();
  actionVolumeObservable = this.actionVolumeSubject.asObservable();

  constructor(private fetchService: FetchService) {
    this.playItemSubscription = Observable.combineLatest(
      this.fetchService.fetchPlaylist(),
      this.fetchService.fetchStatusCurrentPlaying(),
      (playlist, currentPlaying) => [playlist, currentPlaying]
    ).subscribe(pair => {
      this.playlist = pair[0] as [PlayItem];
      this.currentPlaying = pair[1] as string;
      const playItem = this.playlist.find(item => item.key === this.currentPlaying);
      if (playItem) {
        this.playItemSubject.next(playItem);
      }
    }, error => console.log(error));
    this.actionPlaySubscription = this.fetchService.fetchActionPlay()
      .subscribe(bool => {
        this.actionPlaySubject.next();
        this.fetchService.play(false);
      });
    this.actionPauseSubscription = this.fetchService.fetchActionPause()
      .subscribe(bool => {
        this.actionPauseSubject.next();
        this.fetchService.pause(false);
      });
    this.actionNextSubscription = this.fetchService.fetchActionNext()
      .subscribe(bool => {
        this.playItem(PlayControl.NEXT);
        this.fetchService.next(false);
      });
    this.actionPrevSubscription = this.fetchService.fetchActionPrev()
      .subscribe(bool => {
        this.playItem(PlayControl.PREVIOUS);
        this.fetchService.back(false);
      });
    this.actionPlusSubscription = this.fetchService.fetchActionPlus()
      .subscribe(bool => {
        this.actionVolumeSubject.next(5);
        this.fetchService.plus(false);
      });
    this.actionMinusSubscription = this.fetchService.fetchActionMinus()
      .subscribe(bool => {
        this.actionVolumeSubject.next(-5);
        this.fetchService.minus(false);
      });
    this.actionMuteSubscription = this.fetchService.fetchActionMute()
      .subscribe(bool => {
        this.actionVolumeSubject.next(-100);
        this.fetchService.mute(false);
      });
    this.actionOnDemandSubscription = this.fetchService.fetchActionOnDemand()
      .subscribe(id => {
        this.playOnDemand(id);
        this.fetchService.onDemand(null);
      });
  }

  ngOnDestroy() {
    this.playItemSubscription.unsubscribe();
    this.actionPlaySubscription.unsubscribe();
    this.actionPauseSubscription.unsubscribe();
    this.actionNextSubscription.unsubscribe();
    this.actionPrevSubscription.unsubscribe();
    this.actionPlusSubscription.unsubscribe();
    this.actionMinusSubscription.unsubscribe();
    this.actionMuteSubscription.unsubscribe();
    this.actionOnDemandSubscription.unsubscribe();
  }

  playItem(playControl: number) {
    const playlistSnapshot = JSON.parse(JSON.stringify(this.playlist));
    let index: number;
    if (!playlistSnapshot || playlistSnapshot.length <= 0) {
      index = null;
    } else if (!this.currentPlaying) {
      index = 0;
    } else {
      const currentIndex = playlistSnapshot.findIndex(playItem => playItem.key === this.currentPlaying);
      switch (playControl) {
        case PlayControl.NEXT:
          index = this.getNextPlayItemIndex(currentIndex, playlistSnapshot.length);
          break;
        case PlayControl.PREVIOUS:
          index = this.getPrevPlayItemIndex(currentIndex, playlistSnapshot.length);
          break;
        default:
          break;
      }
    }
    if (index || index === 0) {
      this.fetchService.updateStatusCurrentPlaying(playlistSnapshot[index].key);
    } else {
      this.fetchService.updateStatusCurrentPlaying(null);
    }
  }

  private playOnDemand(id: string) {
    const playItem = this.playlist.find(item => item.videoId === id);
    if (playItem) {
      this.fetchService.updateStatusCurrentPlaying(playItem.videoId);
    }
  }

  private getNextPlayItemIndex(currentIndex: number, total: number): number {
    const nextIndex = currentIndex + 1;
    if (currentIndex < 0) {
      return 0;
    }
    if (nextIndex > total - 1) {
      return this.loop ? 0 : null;
    }
    return nextIndex;
  }

  private getPrevPlayItemIndex(currentIndex: number, total: number): number {
    const prevIndex = currentIndex - 1;
    if (currentIndex < 0) {
      return 0;
    }
    if (prevIndex < 0) {
      return this.loop ? total - 1 : null;
    }
    return prevIndex;
  }

}
