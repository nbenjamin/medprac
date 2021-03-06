import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DoctorService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DoctorService {
  data1: any[];
  constructor(public http: Http) {
    console.log('Hello DoctorService Provider');
  }

  load() {
      if (this.data1) {


        return Promise.resolve(this.data1);
      }
      return new Promise(resolve => {
        this.http.get('/json/doctors.json')
          .map(res => res.json())
          .subscribe(data => {
            this.data1 = data.doctors;
            resolve(this.data1);
          });
      });
    }
}
