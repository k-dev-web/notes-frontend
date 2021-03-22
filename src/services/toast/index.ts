import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToastController} from '@ionic/angular';


@Injectable()

export class ToastService {
  constructor(public toastController: ToastController) {
  }


  async setToast(m) {
    const toast = await this.toastController.create({
      header: m.class,
      message: m.message,
      position: 'top',
      color: m.class === 'success' ? 'success' : 'danger',
      duration: 2000
    });
    toast.present();
  }


}
