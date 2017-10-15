import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

	constructor(public navCtrl: NavController,
		public http: Http,
		public navParams: NavParams,
		public data:DataProvider){

		this.searchName = navParams.get("searchName");
		this.makeRequest(this.searchName);
	}

	makeRequest(name) {
		var me = this;
		var search = 'https://api.deezer.com/search/track?q=' + name.replace(/ /g, '%20');
		this.http.get(search).map(res=>res.json()).subscribe(
			response => me.showResults(response)			
		);
	}
	showResults(songs){
		this.songResults = songs.data;
	}
	selectSong(){
		this.data.saveDeezerSongCache(this.songResults[this.selectedSong]);
		this.navCtrl.pop();
	}
}