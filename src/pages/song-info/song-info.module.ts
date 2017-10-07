import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongInfoPage } from './song-info';

@NgModule({
  declarations: [
    SongInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SongInfoPage),
  ],
})
export class SongInfoPageModule {}
