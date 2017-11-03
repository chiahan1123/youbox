import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlService } from '../control.service';
import { FetchService } from '../fetch.service';
import { Subscription } from 'rxjs/Subscription';
import { PlayItem } from '../playlist-item/playItem';

@Component({
  selector: 'app-music-controller',
  templateUrl: './music-controller.component.html',
  styleUrls: ['./music-controller.component.scss']
})
export class MusicControllerComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  playingSubscription: Subscription;
  volumeSubscription: Subscription;
  playItem = new PlayItem('', '', '', '', '', '', '');
  playButtonIcon = 'play';
  volume = 0;

  private volumeIncrement = 5;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,
              private controlService: ControlService, private fetchService: FetchService) {
    iconRegistry
      .addSvgIcon('play',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/play-button.svg'))
      .addSvgIcon('pause',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/pause.svg'))
      .addSvgIcon('next',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/next.svg'))
      .addSvgIcon('back',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/back.svg'))
      .addSvgIcon('plus',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/plus.svg'))
      .addSvgIcon('minus',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/minus.svg'))
      .addSvgIcon('volume',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/volume.svg'));
  }

  ngOnInit() {
    this.subscription = this.controlService.playItemObservable
      .subscribe(playItem => this.playItem = playItem, error => console.log(error));
    this.playingSubscription = this.fetchService.fetchIsPlaying()
      .subscribe(isPlaying => this.playButtonIcon = isPlaying ? 'pause' : 'play');
    this.volumeSubscription = this.fetchService.fetchStatusVolume()
      .subscribe(volume => this.volume = volume);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.playingSubscription.unsubscribe();
    this.volumeSubscription.unsubscribe();
  }

  onBack() {
    this.fetchService.back(true);
  }

  onNext() {
    this.fetchService.next(true);
  }

  onPlay() {
    if (this.playButtonIcon === 'play') {
      this.fetchService.play(true);
    } else {
      this.fetchService.pause(true);
    }
  }

  onPlus() {
    this.fetchService.updateStatusVolume(Math.min(Math.max(this.volume + this.volumeIncrement, 0), 100));
  }

  onMinus() {
    this.fetchService.updateStatusVolume(Math.min(Math.max(this.volume - this.volumeIncrement, 0), 100));
  }

  onMute() {
    this.fetchService.updateStatusVolume(0);
  }

}
