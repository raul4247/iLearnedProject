import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DeezerSearchPage } from '../deezer-search/deezer-search';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
	selector: 'page-edit-song',
	templateUrl: 'edit-song.html',
})
export class EditSongPage {
	songImg: string = 'assets/imgs/placeholder180x180.jpg';
	public id;
	public song;
	public tag;
	public songUrl;
	public songTag;
	public available: boolean = false;

	public info = null;
	public deezerAvailable : boolean;
	public loader;

	constructor(public navCtrl: NavController, 
		public data:DataProvider,
		public toastCtrl: ToastController,
		public loading: LoadingController,
		public http: Http,
		public navParams: NavParams){
		this.id = this.navParams.get("id");
		this.song = this.data.getSongById(this.id);

		this.deezerAvailable = this.data.getDeezerAvailable();	

		if(this.song.deezerId!=null){
			this.showLoader();

			var me = this;
			var search = 'https://api.deezer.com/track/' + this.song.deezerId;
			this.http.get(search).map(res=>res.json()).subscribe(
				response => me.loadDeezerInfo(response),
				err => me.errorDeezer()				
				);
		}
	}

	ionViewWillEnter(){
		this.info = this.data.getDeezerSongCache();

		if(this.info!=null)
			this.placeDeezerInfo(this.info);
		else
			this.available = false;

		this.deezerAvailable = this.data.getDeezerAvailable();	
	}

	placeDeezerInfo(deezerInfo){
		this.song.deezerId = deezerInfo.id;
		this.songImg = deezerInfo.album.cover_medium;
		this.song.name = deezerInfo.title_short;
		this.song.artist = deezerInfo.artist.name;
		this.songUrl = deezerInfo.preview;
		this.available = true;
	}
	clearDeezerInfo(){
		this.songImg = 'assets/imgs/placeholder180x180.jpg';
		this.song.name = '';
		this.song.artist = '';
		this.available = false;
	}

	loadDeezerInfo(data){
		this.songImg = data.album.cover_medium;
		this.songUrl = data.preview;
		this.available = true;
		this.dismissLoader();
	}

	editSong(){
		if(this.checkFields()){
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
		if(this.song.name == undefined || this.song.name == "")
			return false;
		else
			return true;
	}

	newTag(){
		this.song.tag.push(this.songTag);
	}
	
	removeTag(tag){
		this.song.tag.splice(this.song.tag.indexOf(tag), 1);
	}

	errorDeezer(){
		this.dismissLoader();
		let toast = this.toastCtrl.create({
			message: 'Erro na conexão com o Deezer!',
			duration: 3000,
			position: 'bottom',
			showCloseButton: true,
			closeButtonText: 'OK'
		});

		toast.present();
	}

	searchDeezer(){
		this.navCtrl.push(DeezerSearchPage,{searchName: this.song.name})
	}

	showLoader(){
		if(!this.loader){
			this.loader = this.loading.create({
				content: 'Acessando Deezer...'
			});
			this.loader.present();
		}
	}

	dismissLoader(){
		if(this.loader){
			this.loader.dismiss();
			this.loader = null;
		}
	}
}