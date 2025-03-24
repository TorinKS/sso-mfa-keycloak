import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppModule } from '../../../mf-kc/src/app/app.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class LocalAppModule { }
