import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
	selector: 'page-create-song',
	templateUrl: 'create-song.html',
})
export class CreateSongPage {
	songName: string;
	songArtist: string;
	songTag: string;
	songRate: number;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public data:DataProvider) {}

	newSong(){
		this.data.storeNewSongCache({name: this.songName, artist: this.songArtist, tag: this.songTag, rate: this.songRate});
		this.data.storeSongsLocal();
		this.navCtrl.pop();

		let toast = this.toastCtrl.create({
			message: 'Nova música adicionada!',
			duration: 3000,
			position: 'bottom',
			showCloseButton: true,
			closeButtonText: 'OK'
		});

		toast.present();
	}
}