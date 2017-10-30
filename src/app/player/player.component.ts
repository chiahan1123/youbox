import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ControlService, PlayControl } from '../control.service';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy, AfterViewInit {

  player: YT.Player;
  private playItemSubscription: Subscription;
  private actionPlaySubscription: Subscription;
  private actionPauseSubscription: Subscription;
  private actionVolumeSubsription: Subscription;
  private initiated = false;

  constructor(private controlService: ControlService, private fetchService: FetchService) {
  }

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: '',
        playerVars: {
          'rel': 0
        },
        events: {
          'onReady': (event) => this.onReady(event),
          'onStateChange': (event) => this.onStateChange(event)
        }
      });
    };
  }

  ngAfterViewInit() {
    const doc = (<any>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  ngOnDestroy() {
    if (this.playItemSubscription) {
      this.playItemSubscription.unsubscribe();
    }
    if (this.actionPlaySubscription) {
      this.actionPlaySubscription.unsubscribe();
    }
    if (this.actionPauseSubscription) {
      this.actionPauseSubscription.unsubscribe();
    }
  }

  onReady(event) {
    this.player.getIframe().style.position = 'absolute';
    this.playItemSubscription = this.controlService.playItemObservable
      .subscribe(playItem => {
        this.initiated = true;
        const videoUrl = this.player.getVideoUrl();
        if (!videoUrl || !videoUrl.includes(playItem.videoId)) {
          this.player.loadVideoById(playItem.videoId);
        }
      });
    this.actionPlaySubscription = this.controlService.actionPlayObservable
      .subscribe(() => this.player.playVideo());
    this.actionPauseSubscription = this.controlService.actionPauseObservable
      .subscribe(() => this.player.pauseVideo());
    this.actionVolumeSubsription = this.controlService.actionVolumeObservable
      .subscribe(value =>
        this.player.setVolume(Math.min(Math.max(this.player.getVolume() + value, 0), 100)));
  }

  onStateChange(event) {
    if (YT.PlayerState.PLAYING) {
      const qualities = this.player.getAvailableQualityLevels();
      if (qualities && qualities.length > 0) {
        this.player.setPlaybackQuality(qualities[0]);
      }
    }
    if ((!this.initiated && event.data === YT.PlayerState.UNSTARTED) || event.data === YT.PlayerState.ENDED) {
      this.initiated = true;
      this.controlService.playItem(PlayControl.NEXT);
    }
    if (event.data === YT.PlayerState.PLAYING) {
      this.fetchService.updateStatusIsPlaying(true);
    } else if (event.data === YT.PlayerState.PAUSED) {
      this.fetchService.updateStatusIsPlaying(false);
    }
  }

}
