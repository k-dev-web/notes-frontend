import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesProvider} from '../../providers/providers/notes';
import {CategoriesProvider} from '../../providers/providers/categories';
import {ModalController} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
})
export class ModalPage {
  public minDate = '';
  @Input() model: {
    form: any,
    title: string,
    isEdit: boolean,
    buttons: [{
      action: (ctrl: any, form: any) => {},
      name: string,
      class: string,
      color: string,
      supportElements: any
    }]
    inputs: [{
      name: string,
      class: string,
      placeHolder: string,
      value: any,
      type: string,
      list?: [],
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
    let dateTmp = new Date();

    this.minDate = dateTmp.getFullYear() + '-' + dateTmp.getDate() + '-' + dateTmp.getMonth();
    console.log(this.minDate);
  }


  ngOnInit() {
    console.log('in init');
    console.log(this.model);
  }

  compareFn(item1, item2) {
    console.log(item1, item2);
    return item1 === item2 ? false : true;
  }

}
