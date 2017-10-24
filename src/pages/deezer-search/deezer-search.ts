import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
	selector: 'page-deezer-search',
	templateUrl: 'deezer-search.html',
})
export class DeezerSearchPage {
	searchName: string;
	public songResults : any = [];
	public selectedSong;
	public loader;

	public results: boolean = true;

	constructor(public navCtrl: NavController,
		public http: Http,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loading: LoadingController,
		public data:DataProvider){

		this.searchName = navParams.get("searchName");
		if(this.searchName==undefined)
			this.makeRequest(" ");
		else
			this.makeRequest(this.searchName);
	}

	makeRequest(name) {
		this.showLoader();

		var me = this;
		var search = 'https://api.deezer.com/search/track?q=' + name.replace(/ /g, '%20');
		this.http.get(search).map(res=>res.json()).subscribe(
			response => me.showResults(response),
			err => me.errorDeezer()		
			);
	}
	
	showResults(songs){
		if(songs.hasOwnProperty('error') || songs.total == 0)
			this.results = false;

		this.songResults = songs.data;
		this.dismissLoader();
	}

	errorDeezer(){
		this.results = false;
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
	
	selectSong(){
		this.data.saveDeezerSongCache(this.songResults[this.selectedSong]);
		this.navCtrl.pop();
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