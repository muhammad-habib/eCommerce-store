import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [AddressesService]
})
export class LandingPageComponent implements OnInit {

  constructor() { }
  location={};
  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        console.log(this.location); 
      });
   }
  }

}
