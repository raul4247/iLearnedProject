import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';

import { DeezerSearchPage } from '../deezer-search/deezer-search';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
	selector: 'page-create-song',
	templateUrl: 'create-song.html',
})
export class CreateSongPage {
	songImg: string = 'assets/imgs/placeholder180x180.jpg';
	songName: string;
	songArtist: string;
	songTag: string;
	songUrl: string;
	songNotes: string = '';

	rsp: string;
	available: boolean = false;
	songRate: number;
	createdTags = [];
	public info = null;

	public deezerAvailable : boolean;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public data:DataProvider) {
		var deez = this.data.getDeezerAvailable();

		if(deez	== null ||deez == undefined)
			this.data.setDeezerAvailable(true);
		else
			this.deezerAvailable = deez;
	}

	ionViewWillEnter(){
		this.info = this.data.getDeezerSongCache();

		if(this.info!=null)
			this.placeDeezerInfo(this.info);
		else
			this.available = false;

		this.deezerAvailable = this.data.getDeezerAvailable();
	}

	newSong(){
		if(this.checkFields()){
			this.data.storeNewSongCache({name: this.songName, artist: this.songArtist, tag: this.createdTags, rate: this.songRate, notes: this.songNotes, deezerId: this.info.id});
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
		else{
			let toast = this.toastCtrl.create({
				message: 'Uma música precisa de um nome!',
				duration: 3000,
				position: 'bottom',
				showCloseButton: true,
				closeButtonText: 'OK'
			});

			toast.present();
		}		
	}

	checkFields(){
		if(this.info==null)
			this.info = {id:null};
		if(this.songName == undefined || this.songName == "")
			return false;
		else
			return true;
	}

	newTag(){
		if(this.songTag != "" && this.songTag !=undefined){
			this.createdTags.push(this.songTag);
			this.songTag = "";
		}
	}
	removeTag(tag){
		this.createdTags.splice(this.createdTags.indexOf(tag), 1);
	}
	searchDeezer(){
		this.navCtrl.push(DeezerSearchPage,{searchName: this.songName})
	}
	placeDeezerInfo(deezerInfo){
		this.songImg = deezerInfo.album.cover_medium;
		this.songName = deezerInfo.title_short;
		this.songArtist = deezerInfo.artist.name;
		this.songUrl = deezerInfo.preview;
		this.available = true;
	}
	clearDeezerInfo(){
		this.songImg = 'assets/imgs/placeholder180x180.jpg';
		this.songName = '';
		this.songArtist = '';
		this.available = false;
	}
	ionViewWillUnload(){
		this.data.clearDeezerSongCache();
	}
}