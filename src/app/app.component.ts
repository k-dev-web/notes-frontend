import {Component} from '@angular/core';
import {CategoriesProvider} from '../providers/providers/categories';
import {AlertController, ModalController} from '@ionic/angular';
import {ModalPage} from '../components/modals/modal';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {title: 'Notes', url: '/folder/notes', icon: 'mail'},
  ];
  public labels = [];

  constructor(
    private categories: CategoriesProvider,
    private alertController: AlertController,
    private modalCtrl: ModalController,
  ) {


  }

  ngOnInit() {
    this.categories.getCategories();
  }


  async presentModal(isNew) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-modal-content',
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
      componentProps: {
        title: 'New category',
        isEdit: false,
        buttons: [{
          action: () => {
          },
          name: 'Create',
          class: '',
        },
          {
            action: () => {
            },
            name: 'Cancel',
            class: '',
          }],
        inputs: [{
          name: 'name',
          class: '',
          placeHolder: 'name category',
          value: '',
          type: 'text',
          validators: [Validators.required]
        },
          {
            name: 'description',
            class: '',
            placeHolder: 'description category',
            value: '',
            type: 'textarea',
            validators: []
          }]
      }
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();


  }


}
