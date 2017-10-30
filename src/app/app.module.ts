import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FacebookModule } from 'ngx-facebook';
import { HttpModule } from '@angular/http';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { HeaderComponent } from './header/header.component';
import { SummaryComponent } from './summary/summary.component';
import { PlayListItemComponent } from './playlist-item/playlist-item.component';
import { PlayListComponent } from './playlist/playlist.component';
import { ProgressComponent } from './progress/progress.component';
import { ProgressService } from './progress.service';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { environment } from '../environments/environment';
import { FetchService } from './fetch.service';
import { LoginComponent } from './login/login.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ControlService } from './control.service';
import { MusicControllerComponent } from './music-controller/music-controller.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    SummaryComponent,
    PlayListItemComponent,
    PlayListComponent,
    ProgressComponent,
    HomeComponent,
    ClientComponent,
    LoginComponent,
    SearchListComponent,
    MusicControllerComponent,
    PreviewComponent
  ],
  entryComponents: [PreviewComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserModule,
    FacebookModule.forRoot(),
    ScrollToModule.forRoot(),
    FlexLayoutModule,
    YoutubePlayerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  providers: [
    ProgressService,
    FetchService,
    ControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
