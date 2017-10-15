import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { CreateSongPage } from '../create-song/create-song';
import { SongInfoPage } from '../song-info/song-info';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
	selector: 'page-tags',
	templateUrl: 'tags.html',
})
export class TagsPage {
	public list;
	public tags;
	public tagsList;

	constructor(public navCtrl: NavController, 
		public data:DataProvider){}

	ionViewWillEnter(){
		this.list = this.data.getSongsCache();
		this.tagsList = this.data.createTagLists();
		this.tags = Object.keys(this.tagsList);

		// FALTA ORGANIZAR EM ORDEM ALFABETICA AS TAGS
	}

	createSong(){
		this.navCtrl.push(CreateSongPage);
	}

	songInfoPage(id:string){
		this.navCtrl.push(SongInfoPage,{id: id});
	}
}