import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

import { EditSongPage } from '../edit-song/edit-song';

@IonicPage()
@Component({
	selector: 'page-song-info',
	templateUrl: 'song-info.html',
})
export class SongInfoPage {
	public song;
	public id;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public data:DataProvider){
		this.id = this.navParams.get("id");
		this.song = this.data.getSongById(this.id);
	}

	ionViewWillEnter(){
		this.song = this.data.getSongById(this.id);
	}

	updateSong(){
		this.navCtrl.push(EditSongPage,{id: this.id});
	}
	removeSong(){
		let confirm = this.alertCtrl.create({
			title: 'Confirmação:',
			message: 'Tem certeza que deseja deletar esta música?',
			buttons: [
			{
				text: 'Cancelar',
				handler: () => {}
			},
			{
				text: 'Deletar',
				handler: () => {
					this.data.removeSongCache(this.song.id);
					this.data.storeSongsLocal();
					this.navCtrl.pop();

					let toast = this.toastCtrl.create({
						message: 'Música removida!',
						duration: 3000,
						position: 'bottom',
						showCloseButton: true,
						closeButtonText: 'OK'
					});

					toast.present();
				}
			}
			]
		});
		confirm.present();
	}
}