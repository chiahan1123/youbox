import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PlayItem } from './playlist-item/playItem';
import { environment } from '../environments/environment';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class YoutubeService {

  readonly resultCount = 20;

  constructor(private http: Http, private afDb: AngularFireDatabase) {
  }

  searchYoutube(term: string): Observable<[PlayItem]> {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key='
      + environment.apiKey + '&q=' + term + '&part=snippet,id&maxResults=' + this.resultCount)
      .map((res) => res.json()['items'])
      .mergeMap(array => Observable.from(array))
      .map(data => new PlayItem(this.afDb.createPushId(), data['id']['videoId'], data['snippet']['thumbnails']['default']['url'],
        data['snippet']['title'], data['snippet']['channelTitle'], data['snippet']['description'], ''))
      .filter(item => item.videoId)
      .toArray();
  }

}
