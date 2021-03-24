import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesProvider} from '../../providers/providers/notes';
import {ModalPage} from '../../components/modals/modal';
import {FormBuilder, Validators} from '@angular/forms';
import {CategoriesProvider} from '../../providers/providers/categories';
import {ModalController} from '@ionic/angular';
import {ToastService} from '../../services/toast';
import * as moment from 'moment';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public modalForm: any;

  constructor(
    private categories: CategoriesProvider,
    private modalCtrl: ModalController,
    private toast: ToastService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notes: NotesProvider,
  ) {
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.notes.getNotes();
  }

  async initForm(values?) {
    this.modalForm = this.fb.group({
      id: [values ? values.id : null],
      name: [values ? values.name : '', Validators.compose([Validators.required])],
      description: [values ? values.description : '', Validators.compose([Validators.required])],
      category_id: [values ? values.Category.id : '', Validators.compose([Validators.required])],
      time_stamp: [values ? values.time_stamp : '', Validators.compose([Validators.required])],
    });
  }

  async createNote(ctrl, values) {
    if (!values.valid) {
      ctrl.toast.setToast({message: 'all field required'});
      return;
    }
    await ctrl.notes.createNotes(values.value);
    ctrl.moduleCtrl.dismiss();
  }

  async deleteNote(ctrl, values) {
    await ctrl.notes.deleteNotes(values.value);
    ctrl.moduleCtrl.dismiss();
  }

  async updateNote(ctrl, values) {
    if (!values.value.name) {
      ctrl.toast.setToast({message: 'name required'});
      return;
    }
    await ctrl.notes.updateNotes(values.value);
    ctrl.moduleCtrl.dismiss();
  }

  async modalDissmis(ctrl, values) {
    ctrl.moduleCtrl.dismiss();
  }

  convertDate(date) {
    return moment.utc(date).format('YYYY-MM-DD HH:mm');
  }

  sortedNote(list) {
    return list.sort((item1, item2) => {
      if (moment(item1.time_stamp).isBefore(item2.time_stamp)) {
        return -1;
      } else if (moment(item1.time_stamp).isSame(item2.time_stamp)) {
        return 0;
      } else {
        return 1;
      }
    });
  }

  async presentAddModal() {
    await this.initForm();
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-modal-content',
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
      componentProps: {
        model: {
          title: 'New note',
          isEdit: false,
          form: this.modalForm,
          buttons: [{
            action: this.createNote,
            name: 'Create',
            class: '',
            color: 'danger',
            supportElements: {
              moduleCtrl: this.modalCtrl,
              notes: this.notes,
              toast: this.toast
            },
          },
            {
              action: this.modalDissmis,
              name: 'Cancel',
              class: '',
              color: 'danger',
              supportElements: {
                moduleCtrl: this.modalCtrl,
              },
            }],
          inputs: [{
            name: 'name',
            class: '',
            placeHolder: 'name note',
            value: '',
            type: 'text',
            validators: [Validators.required]
          },
            {
              name: 'description',
              class: '',
              placeHolder: 'description note',
              value: '',
              type: 'textarea',
              validators: [Validators.required]
            },
            {
              name: 'time_stamp',
              class: '',
              placeHolder: new Date(),
              value: '',
              type: 'datepicker',
              validators: [Validators.required]
            }, {
              name: 'category_id',
              list: this.categories.categories.getValue().list,
              class: '',
              placeHolder: 'category',
              value: '',
              type: 'select',
              validators: [Validators.required]
            }]
        }
      }
    });
    await modal.present();
  }

  async presentInfoModal(note) {
    await this.initForm(note);
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-modal-content',
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
      componentProps: {
        model: {
          title: 'Note',
          isEdit: false,
          form: this.modalForm,
          buttons: [{
            action: this.updateNote,
            name: 'Update',
            class: '',
            color: 'danger',
            supportElements: {
              moduleCtrl: this.modalCtrl,
              notes: this.notes,
              toast: this.toast

            },
          },
            {
              action: this.deleteNote,
              name: 'Delete',
              class: '',
              color: 'danger',
              supportElements: {
                moduleCtrl: this.modalCtrl,
                categories: this.categories,
                toast: this.toast
              },
            }],
          inputs: [{
            name: 'name',
            class: '',
            placeHolder: 'name note',
            value: '',
            type: 'text',
            validators: [Validators.required]
          },
            {
              name: 'description',
              class: '',
              placeHolder: 'description note',
              value: '',
              type: 'textarea',
              validators: [Validators.required]
            },
            {
              name: 'time_stamp',
              class: '',
              placeHolder: new Date(),
              value: '',
              type: 'datepicker',
              validators: [Validators.required]
            }, {
              name: 'category_id',
              list: this.categories.categories.getValue().list,
              class: '',
              placeHolder: 'category',
              value: note.Category,
              type: 'select',
              validators: [Validators.required]
            }]
        }
      }
    });
    await modal.present();
  }
}
