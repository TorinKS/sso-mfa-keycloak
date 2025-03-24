import { APP_INITIALIZER, DoBootstrap, Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { initializeKeycloak } from './keycloak-init.factory';
import { environment } from '../environments/environment';
import { MF_TAG } from '../mf-tag';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      //useFactory: environment.production ? initializeKeycloak : () => () => null,
      useFactory:  initializeKeycloak ,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  exports: [AppComponent]
})

export class AppModule implements DoBootstrap {
  public constructor(private readonly injector: Injector) {}

  public ngDoBootstrap(): void {
    const custom = createCustomElement(AppComponent, {injector: this.injector});
    if (!window.customElements.get(MF_TAG)) {
      window.customElements.define(MF_TAG, custom);
    }
  }
}
