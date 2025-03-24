import { Component } from '@angular/core';
import { MF_TAG } from '../../../mf-kc/src/mf-tag';

@Component({
  selector: 'local-root',
  template: `<${MF_TAG}></${MF_TAG}>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {}
