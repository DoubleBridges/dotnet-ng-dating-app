import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: Array<string> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(`${this.baseUrl}buggy/not-found`).subscribe(res => {
      console.log(res);
    }, error => {
      console.error(error);
    })
  }

  get400Error() {
    this.http.get(`${this.baseUrl}buggy/bad-request`).subscribe(res => {
      console.log(res);
    }, error => {
      console.error(error);
    })
  }

  get500Error() {
    this.http.get(`${this.baseUrl}buggy/server-error`).subscribe(res => {
      console.log(res);
    }, error => {
      console.error(error);
    })
  }

  get401Error() {
    this.http.get(`${this.baseUrl}buggy/auth`).subscribe(res => {
      console.log(res);
    }, error => {
      console.error(error);
    })
  }

  get400ValidationError() {
    this.http.post(`${this.baseUrl}account/register`, {}).subscribe(res => {
      console.log(res);
    }, error => {
      console.error(error);
      this.validationErrors = error;
    })
  }

}
