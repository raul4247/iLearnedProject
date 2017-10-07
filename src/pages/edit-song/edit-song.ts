import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
	selector: 'page-edit-song',
	templateUrl: 'edit-song.html',
})
export class EditSongPage {
	public id;
	public song;
	public tag;

	constructor(public navCtrl: NavController, 
		public data:DataProvider,
		public toastCtrl: ToastController,
		public navParams: NavParams){
		this.id = this.navParams.get("id");
		this.song = this.data.getSongById(this.id);
	}
	editSong(){
		this.data.updateSongCache(this.song,this.id);
		this.data.storeSongsLocal();
		this.navCtrl.pop();

		let toast = this.toastCtrl.create({
			message: 'Dados da música editados!',
			duration: 3000,
			position: 'bottom',
			showCloseButton: true,
			closeButtonText: 'OK'
		});

		toast.present();
	}
	newTag(){
		this.song.tag.push(this.tag);
	}
	removeTag(tag){
		this.song.tag.splice(this.song.tag.indexOf(tag), 1);
	}
}