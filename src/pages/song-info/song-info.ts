import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { EditSongPage } from '../edit-song/edit-song';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
	selector: 'page-song-info',
	templateUrl: 'song-info.html',
})
export class SongInfoPage {
	public song;
	public id;
	public songImg : string = 'assets/imgs/placeholder180x180.jpg';
	public songUrl;
	public songNotes;
	public available: boolean = false;
	public notes: boolean = false;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public http: Http,
		public data:DataProvider){
		this.id = this.navParams.get("id");
		this.song = this.data.getSongById(this.id);

		if(this.song.deezerId!=null){
			var me = this;
			var search = 'https://api.deezer.com/track/' + this.song.deezerId;
			this.http.get(search).map(res=>res.json()).subscribe(
				response => me.loadDeezerInfo(response)			
				);
		}
		if(this.song.notes.length!=0){
			this.songNotes = this.song.notes;
			this.notes = true;
		}
	}
	ionViewWillEnter(){
		this.song = this.data.getSongById(this.id);
	}

	loadDeezerInfo(data){
		this.songImg = data.album.cover_medium;
		this.songUrl = data.preview;
		this.available = true;
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