import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {Interceptor} from './interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
];
