import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigPage } from './config';
import { Clipboard } from '@ionic-native/clipboard';


@NgModule({
  declarations: [
    ConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigPage),
    Clipboard
  ],
})
export class ConfigPageModule {}
