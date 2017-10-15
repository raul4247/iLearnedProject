import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { Ionic2RatingModule } from 'ionic2-rating';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Clipboard } from '@ionic-native/clipboard';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { TagsPage } from '../pages/tags/tags';
import { ConfigPage } from '../pages/config/config';

import { CreateSongPage } from '../pages/create-song/create-song';
import { SongInfoPage } from '../pages/song-info/song-info';
import { EditSongPage } from '../pages/edit-song/edit-song';
import { DeezerSearchPage } from '../pages/deezer-search/deezer-search';

import { DataProvider } from '../providers/data/data';


@NgModule({
  declarations: [
  MyApp,
  TabsPage,
  HomePage,
  TagsPage,
  ConfigPage,
  CreateSongPage,
  SongInfoPage,
  EditSongPage,
  DeezerSearchPage
  ],
  imports: [
  BrowserModule,
  HttpModule,
  IonicModule.forRoot(MyApp),
  IonicStorageModule.forRoot(),
  Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  TabsPage,
  HomePage,
  TagsPage,
  ConfigPage,
  CreateSongPage,
  SongInfoPage,
  EditSongPage,
  DeezerSearchPage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  Clipboard,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
