import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,

} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {ToastService} from '../../../services/toast';


@Injectable()

export class Interceptor implements HttpInterceptor {


  constructor(
    public http: HttpClient,
    public toast: ToastService,
  ) {
  }


  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept');
    return next.handle(req.clone({
      url: 'http://127.0.0.1:5000' + req.url,
      setHeaders: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }))
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {

              default:
                this.handleError(error);
                return Observable.throw(error);
            }
          }
        })
      );

  }


  public handleError(error) {
    this.toast.setToast({message: JSON.stringify(error), class: 'error'});
    return Observable.throw(error);
  }

}
