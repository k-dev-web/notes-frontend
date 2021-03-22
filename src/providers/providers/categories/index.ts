import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {ToastService} from '../../../services/toast';


@Injectable()

export class CategoriesProvider {
  public categories: BehaviorSubject<{ list: [] }> = new BehaviorSubject({list: []});
  public categories$ = this.categories.asObservable();

  constructor(
    public http: HttpClient,
    public router: Router,
    public toast: ToastService
  ) {
  }

  async getCategories() {
    this.http.get('/api/getCategories')

      .subscribe(c => {

        this.categories.next({list: c['categories']});

      });


  }


}


