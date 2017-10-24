import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSongPage } from './edit-song';
import { Http } from '@angular/http';

@NgModule({
  declarations: [
    EditSongPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSongPage),
    Http
  ],
})
export class EditSongPageModule {}
