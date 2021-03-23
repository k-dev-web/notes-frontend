import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {ToastService} from '../../../services/toast';
import {NotesProvider} from '../notes';


@Injectable()

export class CategoriesProvider {
  public categories: BehaviorSubject<{ list: any[] }> = new BehaviorSubject({list: []});
  public categories$ = this.categories.asObservable();
  public filterCategories: BehaviorSubject<{ list: {} }> = new BehaviorSubject({list: {}});
  public filterCategories$ = this.filterCategories.asObservable();

  constructor(
    public http: HttpClient,
    public router: Router,
    public toast: ToastService,
  ) {
  }

  async changeCategoriesToFilter(category, id) {

    let tmpC = this.categories.getValue().list;

    if (this.filterCategories.getValue().list[category.id]) {
      let tmp = this.filterCategories.getValue().list;
      tmp[category.id] = false;
      this.filterCategories.next({list: tmp});
      tmpC[id].inFilter = false;
      this.categories.next({list: tmpC});

    } else {
      let tmp = this.filterCategories.getValue().list;
      tmp[category.id] = true;
      tmpC[id].inFilter = true;
      this.filterCategories.next({list: tmp});
      this.categories.next({list: tmpC});

    }
    // this.filterCategories.next({list: c['categories']});

  }

  async getCategories() {
    this.http.get('/api/getCategories')
      .subscribe(c => {
        let tmpC = c['categories'];
        tmpC.forEach(newCategory => {

          if (this.filterCategories.getValue().list[newCategory.id]) {
            newCategory.inFilter = true;
            return;
          }

        });


        this.categories.next({list: tmpC});
      });


  }

  async createCategories(value) {
    this.http.post('/api/createCategories', value)
      .subscribe(res => {
        if (res['message'] === 'Ok') {
          this.toast.setToast({class: 'success', message: 'categories created'});
          this.getCategories();
        }

      });
  }

  async updateCategories(value) {
    this.http.put('/api/upCategories', value)
      .subscribe(res => {

        if (res['message'] === 'Ok') {
          this.toast.setToast({class: 'success', message: 'categories updated'});
          this.getCategories();
        }

      });
  }

  async deleteCategories(value) {
    this.http.delete('/api/deleteCategories', {params: {id: value.id}})
      .subscribe(res => {
        if (res['message'] === 'ok') {
          this.toast.setToast({class: 'success', message: 'categories deleted'});
          this.getCategories();
        }
      });
  }

}


