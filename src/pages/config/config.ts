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
	public importData: string;
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

	checkImport(){
		try {
			if(JSON.parse(this.importData) && !!this.importData){
				let confirm = this.alertCtrl.create({
					title: 'Confirmação:',
					message: 'Todos os dados atuais serão sobrescritos, e tenha certeza de que os dados estão no formato do iLearned.',
					buttons: [
					{
						text: 'Cancelar',
						handler: () => {}
					},
					{
						text: 'Importar',
						handler: () => {
							this.data.cleanCache();
							this.data.cleanLocalStorage();
							this.data.importSongs(JSON.parse(this.importData));
							this.data.setDeezerAvailable(this.deezer);
							let toast = this.toastCtrl.create({
								message: 'Dados importados!',
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
		} catch (e) {
			let toast = this.toastCtrl.create({
				message: 'Erro: O formato não é JSON',
				duration: 1500,
				position: 'bottom',
				showCloseButton: true,
				closeButtonText: 'OK'
			});
			toast.present();
		}
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
			me.exportData = json;
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

	showExample(){
		let alert = this.alertCtrl.create({
			title: 'Exemplo de objeto',
			subTitle: '{\"name\":\"Sweet Child O Mine\",\"artist\":\"Guns N Roses\",\"tag\":[\"solo\"],\"rate\":4,\"notes\":\"Intro apenas.\",\"deezerId\":2171464,\"id\":0}',
			buttons: ['Entendi!']
		});
		alert.present();

	}

	about(){
		let alert = this.alertCtrl.create({
			title: 'iLearned v1.0',
			subTitle: 'Desenvolvido por Raul F. Mansur e Arthur de Brito B.',
			buttons: ['Obrigado pelo app!']
		});
		alert.present();
	}
}