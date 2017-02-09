import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { DetailsPage } from '../details/details';

import { DoctorService } from '../../providers/doctor-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DoctorService]
})
export class HomePage {
  items;
  public doctors: any[];
  constructor(public navCtrl: NavController, public doctorService: DoctorService) {
    //this.initializeItems();

  }

  initializeItems() {
    this.items = [
      'Bangalore',
      'Kochi',
      'Trivandrum'
    ];
  }

  itemSelected(item) {
    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;
    if (val.trim() == '') {
      this.items =[];
      this.doctors = [];
    }

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.doctorService.load()
        .then(data1 => {
          this.doctors = data1.filter((doctor) => {return (doctor.location.toLowerCase().indexOf(val.toLowerCase()) > -1);})
        });
    }
  }
}
