import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { Ionic2RatingModule } from 'ionic2-rating';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { TagsPage } from '../pages/tags/tags';
import { ConfigPage } from '../pages/config/config';

import { CreateSongPage } from '../pages/create-song/create-song';
import { SongInfoPage } from '../pages/song-info/song-info';
import { EditSongPage } from '../pages/edit-song/edit-song';

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
  EditSongPage
  ],
  imports: [
  BrowserModule,
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
  EditSongPage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
