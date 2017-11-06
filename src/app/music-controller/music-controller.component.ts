import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ControlService } from '../control.service';
import { FetchService } from '../fetch.service';
import { PlayItem } from '../playlist-item/playItem';

@Component({
  selector: 'app-music-controller',
  templateUrl: './music-controller.component.html',
  styleUrls: ['./music-controller.component.scss']
})
export class MusicControllerComponent implements OnInit {

  playItem: Observable<PlayItem>;
  playButtonIcon: Observable<string>;
  volume: Observable<number>;

  private isPlaying = false;
  private volumeValue = 0;
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
    this.playItem = this.controlService.playItemObservable;
    this.playButtonIcon = this.fetchService.fetchIsPlaying()
      .do(isPlaying => this.isPlaying = isPlaying)
      .map(isPlaying => isPlaying ? 'pause' : 'play');
    this.volume = this.fetchService.fetchStatusVolume()
      .do(volume => this.volumeValue = volume);
  }

  onBack() {
    this.fetchService.back(true);
  }

  onNext() {
    this.fetchService.next(true);
  }

  onPlay() {
    if (this.isPlaying) {
      this.fetchService.pause(true);
    } else {
      this.fetchService.play(true);
    }
  }

  onPlus() {
    this.fetchService.updateStatusVolume(Math.min(Math.max(this.volumeValue + this.volumeIncrement, 0), 100));
  }

  onMinus() {
    this.fetchService.updateStatusVolume(Math.min(Math.max(this.volumeValue - this.volumeIncrement, 0), 100));
  }

  onMute() {
    this.fetchService.updateStatusVolume(0);
  }

}
