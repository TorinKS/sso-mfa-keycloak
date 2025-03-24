import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MF_TAG } from '../mf-tag';

@Component({
  selector: MF_TAG,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private readonly http: HttpClient) {
    this.getTestData();
  }

  getTestData(): void {
    const random = Math.floor(Math.random() * 10) + 1;
    this.http.get(`https://jsonplaceholder.typicode.com/users/${random}`, {observe: 'response'})
      .subscribe(resp => {
        console.info("Content-Type:", resp.headers.get('Content-Type'));
      });
  }
}
