import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateSongPage } from '../create-song/create-song';
import { SongInfoPage } from '../song-info/song-info';

import { DataProvider } from '../../providers/data/data';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {
	public list = [];

	constructor(public navCtrl: NavController, 
		public data:DataProvider){}



	ionViewDidLoad(){
		var me = this;
		this.data.storage.get('songs').then(function (json){
			if(json!=null)
				me.list = JSON.parse(json);
		});
	}

	ionViewWillEnter(){
		this.list = this.data.getSongsCache();
	}

	createSong(){
		this.navCtrl.push(CreateSongPage);
	}

	songInfoPage(id:string){
		this.navCtrl.push(SongInfoPage,{id: id});
	}
}