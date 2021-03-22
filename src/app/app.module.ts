import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy,  ModalController} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CategoriesProvider} from '../providers/providers/categories';
import {NotesProvider} from '../providers/providers/notes';
import {httpInterceptorProviders} from '../providers/providers/http-interceptors';
import {HttpClientModule} from '@angular/common/http';
import {ToastService} from '../services/toast';
import {ModalPage} from '../components/modals/modal';
import {FormBuilder} from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ModalPage],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    FormBuilder,
    ModalController,
    ToastService,
    CategoriesProvider,
    NotesProvider,
    httpInterceptorProviders,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
