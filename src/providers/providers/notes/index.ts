import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {CategoriesProvider} from '../categories';
import {ToastService} from '../../../services/toast';


@Injectable()

export class NotesProvider {
  public notes: BehaviorSubject<{ list: any[] }> = new BehaviorSubject({list: []});
  public notes$ = this.notes.asObservable();
  public filterNotes: BehaviorSubject<{ list: any[] }> = new BehaviorSubject({list: []});
  public filterNotes$ = this.filterNotes.asObservable();

  constructor(
    public http: HttpClient,
    public router: Router,
    public categories: CategoriesProvider,
    public  toast: ToastService,
  ) {
  }

  async filteredNotes(categories) {
    if (Object.keys(categories).findIndex(key => categories[key]) >= 0) {
      this.filterNotes.next({
        list: this.notes.getValue().list.filter(newNotes => {

          return categories[newNotes.Category.id] ? true : false;
        })
      });
    } else {
      this.filterNotes.next({
        list: this.notes.getValue().list
      });
    }

  }


  async getNotes() {
    this.http.get('/api/getNotes')
      .subscribe(n => {
        if (n['notes'].length) {
          this.notes.next({list: n['notes']});
          let tmpN = n['notes'].filter(newNotes => this.categories.filterCategories.getValue().list[newNotes.Category.id] ? false : true);
          this.filterNotes.next({list: tmpN});
        } else {
          this.notes.next({list: []});
          this.filterNotes.next({list: []});
        }
      });
  }

  async createNotes(value) {
    this.http.post('/api/createNotes', value)
      .subscribe(res => {
        if (res['message'] === 'Ok') {
          this.toast.setToast({class: 'success', message: 'notes created'});
          this.getNotes();
        }

      });
  }

  async updateNotes(value) {
    this.http.put('/api/upNotes', value)
      .subscribe(res => {

        if (res['message'] === 'Ok') {
          this.toast.setToast({class: 'success', message: 'notes updated'});
          this.getNotes();
        }

      });
  }

  async deleteNotes(value) {
    this.http.delete('/api/deleteNotes', {params: {id: value.id}})
      .subscribe(res => {
        if (res['message'] === 'ok') {
          this.toast.setToast({class: 'success', message: 'notes deleted'});
          this.getNotes();
        }
      });
  }

}
