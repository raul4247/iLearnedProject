import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataProvider {
	items = [];
	tagLists = [];
	deezerSong = null;
	deezerAvailable: boolean;

	constructor(public storage: Storage){
		this.items = [];
		this.tagLists = [];
		// gets the local storage and puts it in cache
		this.getSongsLocal();
		this.getDeezerAvailableLocal();
	}

	getSongsCache(){
		return this.items;
	}

	storeNewSongCache(song){
		song.id = this.items.length; 
		this.items.push(song);
		this.sortSongs();
	}

	getSongsLocal(){
		var me = this;
		this.storage.get('songs').then(function (json){
			if(json!=null)
				me.items = JSON.parse(json);
		});
	}	

	setDeezerAvailable(status){
		this.deezerAvailable = status;
		this.storage.set('deezerAvailable',status);
	}

	getDeezerAvailable(){
		return this.deezerAvailable;
	}

	getDeezerAvailableLocal(){
		var me = this;
		this.storage.get('deezerAvailable').then(function (resp){
			me.deezerAvailable = resp;
		});		
	}

	storeSongsLocal(){
		this.sortSongs();
		this.storage.set('songs',JSON.stringify(this.items));
	}

	removeSongCache(id){
		var index = this.items.indexOf(this.getSongById(id));
		(<any>this.items).splice(index, 1);
	}

	updateSongCache(song,id){
		var index;
		for(var i=0;i<this.items.length;i++){
			if(this.items[i].id==id) 
				index = i;
		}
		this.items[index] = song;
	}

	getSongById(id){
		for(var i=0;i<this.items.length;i++){
			if(this.items[i].id==id) 
				return this.items[i];
		}
	}

	cleanCache(){
		this.items = [];
	}
	cleanLocalStorage(){
		this.storage.clear();
		this.storage.set('deezerAvailable',true);
	}

	sortSongs(){
		this.items.sort(function(a,b){
			return a.name.localeCompare(b.name);
		});
	}
	
	createTagLists(){
		var songs = this.items;
		var tags = [];

		// get song tag and place it on the tags array 
		for(var i=0;i<songs.length;i++){
			for(var j=0;j<songs[i].tag.length;j++){
				if(!tags.hasOwnProperty(songs[i].tag[j]))
					tags[songs[i].tag[j]] = [];		
				tags[songs[i].tag[j]].push(songs[i]);
			}
		}

		return tags;
	}

	saveDeezerSongCache(song){
		this.deezerSong = song;
	}
	getDeezerSongCache(){
		return this.deezerSong;
	}
	clearDeezerSongCache(){
		this.deezerSong = null;
	}
	importSongs(json){
		for(var i=0;i<json.length;i++)
			this.storeNewSongCache(json[i]);
		this.storeSongsLocal();
	}
}