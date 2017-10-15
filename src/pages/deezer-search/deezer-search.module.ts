import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeezerSearchPage } from './deezer-search';
import { Http } from '@angular/http';

@NgModule({
  declarations: [
    DeezerSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DeezerSearchPage),
    Http
  ],
})
export class DeezerSearchPageModule {}
