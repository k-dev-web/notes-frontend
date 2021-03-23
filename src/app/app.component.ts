import {Component} from '@angular/core';
import {CategoriesProvider} from '../providers/providers/categories';
import {AlertController, ModalController} from '@ionic/angular';
import {ModalPage} from '../components/modals/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../services/toast';
import {NotesProvider} from '../providers/providers/notes';

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
  public modalForm: FormGroup;

  constructor(
    private categories: CategoriesProvider,
    private modalCtrl: ModalController,
    private toast: ToastService,
    private fb: FormBuilder,
    private notes: NotesProvider
  ) {


  }

  ngOnInit() {
    this.categories.getCategories();
    this.categories.filterCategories$.subscribe((fCategories) => {
      this.notes.filteredNotes(fCategories.list);

    });
  }

  async initForm(values?) {
    this.modalForm = this.fb.group({
      id: [values ? values.id : null],
      name: [values ? values.name : '', Validators.compose([Validators.required])],
      description: [values ? values.description : '']
    });
  }


  async createCategory(ctrl, values) {
    if (!values.value.name) {
      ctrl.toast.setToast({message: 'name required'});
      return;
    }
    await ctrl.categories.createCategories(values.value);
    ctrl.moduleCtrl.dismiss();
  }

  async deleteCategory(ctrl, values) {
    await ctrl.categories.deleteCategories(values.value);
    ctrl.moduleCtrl.dismiss();
  }

  async updateCategory(ctrl, values) {
    if (!values.value.name) {
      ctrl.toast.setToast({message: 'name required'});
      return;
    }
    await ctrl.categories.updateCategories(values.value);
    ctrl.moduleCtrl.dismiss();
  }

  async modalDissmis(ctrl, values) {
    ctrl.moduleCtrl.dismiss();
  }

  async addFilter(category, id) {
    await this.categories.changeCategoriesToFilter(category, id);
  }


  async presentAddModal() {
    console.log(this.categories.categories.getValue());
    await this.initForm();
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-modal-content',
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
      componentProps: {
        model: {
          title: 'New category',
          isEdit: false,
          form: this.modalForm,
          buttons: [{
            action: this.createCategory,
            name: 'Create',
            class: '',
            color: 'danger',
            supportElements: {
              moduleCtrl: this.modalCtrl,
              categories: this.categories,
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
      }
    });
    await modal.present();


  }

  async presentInfoModal(category) {
    await this.initForm(category);
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-modal-content',
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
      componentProps: {
        model: {
          title: 'Category',
          isEdit: true,
          form: this.modalForm,
          buttons: [{
            action: this.updateCategory,
            name: 'Update',
            class: '',
            color: 'danger',
            supportElements: {
              moduleCtrl: this.modalCtrl,
              categories: this.categories,
              toast: this.toast

            },
          },
            {
              action: this.deleteCategory,
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
      }
    });
    await modal.present();


  }


}
