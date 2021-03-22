import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesProvider} from '../../providers/providers/notes';
import {CategoriesProvider} from '../../providers/providers/categories';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
})
export class ModalPage {
  public modalForm: FormGroup;


  @Input() model: {
    title: string,
    isEdit: boolean,
    buttons: [{
      action: () => {},
      name: string,
      class: string,
    }]
    inputs: [{
      name: string,
      class: string,
      placeHolder: string,
      value: any,
      type: string,
      validators: []
    }]
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private notes: NotesProvider,
    private categories: CategoriesProvider,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
  ) {
  }

  dismiss() {
    this.modalCtrl.dismiss({});
  }

  ngOnInit() {
this.initForm();
  }

  initForm() {
    let formModel = {};
    console.log(this.model);
    this.model.inputs.forEach(input => {
      formModel[input.name] = [input.value, Validators.compose(input.validators)];
    });

    this.modalForm = this.fb.group(formModel);

  }

}
