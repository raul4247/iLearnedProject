import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, ToastController} from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
	selector: 'page-config',
	templateUrl: 'config.html',
})
export class ConfigPage {
	public exportData: string;
	public deezer: boolean;

	constructor(public navCtrl: NavController, 
		public data:DataProvider,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public clipboard: Clipboard,
		public navParams: NavParams){
		this.deezer = this.data.getDeezerAvailable();
	}
	
	ionViewWillEnter(){
		this.generateExport();
	}

	toogleDeezer(){
		this.data.setDeezerAvailable(this.deezer);
	}

	copyToClipboard(){
		this.clipboard.copy(this.exportData);
		let toast = this.toastCtrl.create({
			message: 'Copiado para clipboard!',
			duration: 1500,
			position: 'bottom',
			showCloseButton: true,
			closeButtonText: 'OK'
		});

		toast.present();
	}

	generateExport(){
		var me = this;
		this.data.storage.get('songs').then(function (json){
			me.exportData = JSON.stringify(json);
		});
	}

	cleanData(){
		let confirm = this.alertCtrl.create({
			title: 'Confirmação:',
			message: 'Tem certeza que deseja apagar todos os dados?',
			buttons: [
			{
				text: 'Cancelar',
				handler: () => {}
			},
			{
				text: 'Deletar',
				handler: () => {
					this.data.cleanCache();
					this.data.cleanLocalStorage();
					let toast = this.toastCtrl.create({
						message: 'Todos os dados foram apagados!',
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