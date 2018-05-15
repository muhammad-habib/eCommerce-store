import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [AddressesService]
})
export class LandingPageComponent implements OnInit {

  constructor(private addressesService : AddressesService ) { 

    
  }
  addresses =[];
  district = '';
  city = '';
  location={};
  ngOnInit() {
    // navigator.geolocation.getCurrentPosition(position => {
    //   console.log(position); 
    //   this.location = position.coords;
    //   console.log(this.location); 
    //   console.log(this.location['longitude']); 
    // });

    if(!localStorage.getItem('device_id')){
        localStorage.setItem('device_id',''+((navigator.platform).replace('','-')+Date.now()+'-'+(Math.floor(Math.random() * 99999999) + 100000000)));          
        console.log("device_id");
        this.getLocation();

    
    }
    else{
      console.log("no device_id");
      this.addressesService.getAddresses().subscribe(
        data=>{
          this.addresses = data['data'];
          console.log(this.addresses);
          if(this.addresses)  
          {
            console.log("this.addresses");
            this.getLocation();
          }
        }
      );
    }

   
  }



  getLocation(){
    console.log(navigator.geolocation?"lol 0":"lol 1")
    if(navigator.geolocation){
      console.log(navigator.geolocation?"lol 0":"lol 1")      
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position); 
        this.location = position.coords;
        console.log(this.location); 
        console.log(this.location['longitude']); 
        this.addressesService.getAddress(this.location['longitude'],this.location['latitude'])
        .subscribe(data =>{            
            this.district = data['district'];
            this.city = data['district'];
        } )
        
      });
    }  
  }


}
