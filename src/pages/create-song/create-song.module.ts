import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { CreateSongPage } from './create-song';

@NgModule({
  declarations: [
    CreateSongPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSongPage),
     CommonModule
  ],
})
export class CreateSongPageModule {}
