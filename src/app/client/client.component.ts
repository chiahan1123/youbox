import { Component, OnInit } from '@angular/core';
import { FacebookService } from 'ngx-facebook';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { YoutubeService } from '../youtube.service';
import { PlayItem } from '../playlist-item/playItem';
import { ProgressService } from '../progress.service';
import * as firebase from 'firebase';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [YoutubeService]
})
export class ClientComponent implements OnInit {

  loaded = false;
  term: string;
  searchList: [PlayItem];

  constructor(private router: Router, private fb: FacebookService, private afAuth: AngularFireAuth,
              private youtube: YoutubeService, private progressService: ProgressService) {
    fb.init(environment.facebookParam);
  }

  ngOnInit() {
    this.progressService.show();
    this.fb.getLoginStatus()
      .then((res: any) => {
        if (res.status !== 'connected') {
          this.router.navigate(['/login']);
        } else {
          this.afAuth.auth.signInWithCredential(FacebookAuthProvider.credential(res.authResponse.accessToken))
            .then(() => {
              this.loaded = true;
              this.progressService.hide();
            });
        }
      })
      .catch(error => console.log(error));
  }

  onSearch() {
    this.progressService.show();
    this.youtube.searchYoutube(this.term)
      .subscribe(list => {
        this.searchList = list;
        this.progressService.hide();
      });
  }

  onEnter(event: any) {
    if (this.term && event['key'] === 'Enter') {
      this.onSearch();
    }
  }

}
