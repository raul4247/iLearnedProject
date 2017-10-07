import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSongPage } from './create-song';

@NgModule({
  declarations: [
    CreateSongPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSongPage),
  ],
})
export class CreateSongPageModule {}
