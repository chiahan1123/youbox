import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { PlayItem } from './playlist-item/playItem';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import { Util } from './util';

@Injectable()
export class FetchService {

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  fetchPlaylist(): Observable<[PlayItem]> {
    return Util.ensureLogin(this.afAuth, this.afDb.list('play_list/' + new Date().toISOString().slice(0, 10))
      .valueChanges()
      .map(items => items as [PlayItem]));
  }

  fetchStatusCurrentPlaying(): Observable<string> {
    return Util.ensureLogin(this.afAuth,
      this.afDb.object('status/' + new Date().toISOString().slice(0, 10) + '/currentPlaying/')
        .valueChanges()
        .map(id => id as string));
  }

  fetchIsPlaying(): Observable<boolean> {
    return Util.ensureLogin(this.afAuth,
      this.afDb.object('status/' + new Date().toISOString().slice(0, 10) + '/isPlaying/')
        .valueChanges()
        .map(id => id as boolean));
  }

  fetchStatusVolume(): Observable<number> {
    return Util.ensureLogin(this.afAuth,
      this.afDb.object('status/volume')
        .valueChanges()
        .map(volume => volume ? volume : 0));
  }

  fetchActionPlay(): Observable<any> {
    return Util.ensureLogin(this.afAuth,
      this.afDb.object('action/play/')
        .valueChanges()
        .filter(bool => bool as boolean));
  }

  fetchActionPause(): Observable<any> {
    return Util.ensureLogin(this.afAuth,
      this.afDb.object('action/pause/')
        .valueChanges()
        .filter(bool => bool as boolean));
  }

  fetchActionNext(): Observable<any> {
    return Util.ensureLogin(this.afAuth,
      this.afDb.object('action/next/')
        .valueChanges()
        .filter(bool => bool as boolean));
  }

  fetchActionPrev(): Observable<any> {
    return Util.ensureLogin(this.afAuth,
      this.afDb.object('action/prev/')
        .valueChanges()
        .filter(bool => bool as boolean));
  }

  fetchActionOnDemand(): Observable<string> {
    return Util.ensureLogin(this.afAuth,
      this.afDb.object('action/onDemand')
        .valueChanges()
        .map(id => id as string)
        .filter(id => !!id));
  }

  writeToPlaylist(item: PlayItem) {
    item.from = this.afAuth.auth.currentUser.photoURL;
    this.afDb.database.ref('play_list/' + new Date().toISOString().slice(0, 10) + '/' + item.key)
      .set(item);
  }

  updateStatusCurrentPlaying(id: number) {
    this.afDb.object('status/' + new Date().toISOString().slice(0, 10) + '/currentPlaying/').set(id);
  }

  updateStatusIsPlaying(isPlaying: boolean) {
    this.afDb.object('status/' + new Date().toISOString().slice(0, 10) + '/isPlaying/').set(isPlaying);
  }

  updateStatusVolume(volume: number) {
    this.afDb.object('status/volume/').set(volume);
  }

  next(action: boolean) {
    this.afDb.object('action/next').set(action);
  }

  back(action: boolean) {
    this.afDb.object('action/prev').set(action);
  }

  play(action: boolean) {
    this.afDb.object('action/play').set(action);
  }

  pause(action: boolean) {
    this.afDb.object('action/pause').set(action);
  }

  onDemand(videoId: string) {
    this.afDb.object('action/onDemand').set(videoId);
  }

}
