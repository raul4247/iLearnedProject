import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSongPage } from './edit-song';

@NgModule({
  declarations: [
    EditSongPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSongPage),
  ],
})
export class EditSongPageModule {}
