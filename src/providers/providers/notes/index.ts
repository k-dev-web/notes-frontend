import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';


@Injectable()

export class NotesProvider {
  public notes: BehaviorSubject<{ list: [] }> = new BehaviorSubject({list: []});
  public notes$ = this.notes.asObservable();

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
  }

  async getNotes() {
    this.http.get('/api/getNotes')
      .subscribe(n => {

        this.notes.next({list: n['notes']});
      });

  }


}
