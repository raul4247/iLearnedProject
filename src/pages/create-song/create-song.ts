import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public data:DataProvider) {}

	ionViewWillEnter(){
		this.info = this.data.getDeezerSongCache();

		if(this.info!=null)
			this.placeDeezerInfo(this.info);
		else
			this.available = false;
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
			// SHOW WINDOW ERROR
			console.log('nop bro');
		}		
	}

	checkFields(){
		//CHECK IF NAME AND ARTIST ARE FILLED UP
		//CHECK RATING STARS
		//CHANGE CSS IF ONE OF THEM IS NOT FILLED (RED UNDERLINE)
		
		if(this.info==null)
			this.info = {id:null};
		return true;
	}

	newTag(){
		this.createdTags.push(this.songTag);
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