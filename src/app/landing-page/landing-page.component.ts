import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service'
import { MarketsService } from './markets.service'
import { MarketTypeDataService } from '../shared/market-type-data.service'


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [AddressesService,MarketsService,MarketTypeDataService]
})
export class LandingPageComponent implements OnInit {

  constructor(private addressesService : AddressesService,
              private marketsService:MarketsService,
              private marketTypeDataService:MarketTypeDataService ) { 

    
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
    if(navigator.geolocation){
      console.log(navigator.geolocation?"lol 0":"lol 1")      
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position); 
        this.location = position.coords;
        console.log(this.location); 
        console.log(this.location['longitude']); 
        localStorage.setItem('long',this.location['longitude']);
        localStorage.setItem('lat',this.location['latitude']);
        this.marketsService.getMarkets().subscribe(data=>{
//            this.markets = data['data'];
        });

        this.addressesService.getAddress(this.location['longitude'],this.location['latitude'])
        .subscribe(data =>{            
            this.district = data['district'];
            this.city = data['district'];
        } );

        
      });
    }  
  }

  selectType(data){
      this.marketTypeDataService.setMarketTypeData(data);
  }

markets = 
[
  {
    "id": 1,
    "color": "#f56d13",
    "market_options_images": [
      "https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/cash.png",
      "https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/empty.png",
      "https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/pointSale.png"
    ],
    "market_icon": "https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/main/1.png",
    "market_image": null,
    "code": "hyper_1",
    "priority": 1,
    "name": "هايبر ماركت",
    "is_hyper": 1,
    "delivery_description": "أقرب ميعاد للتوصيل الاحد ٦ م - ٨ م",
    "last_order": null,
    "express_delivery": 0,
    "express": null,
    "vat_rate": 5
  },
  {
    "id": 5,
    "color": "blue",
    "market_options_images": [
      "https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/cash.png",
      "https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/empty.png",
      "https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/pointSale.png"
    ],
    "market_icon": "https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/main/1.png",
    "market_image": null,
    "code": "mini_5",
    "priority": 2,
    "name": "مياه تانيا",
    "is_hyper": 0,
    "delivery_description": "يتم التوصيل خلال 45 دقيقة",
    "last_order": null,
    "express_delivery": 0,
    "express": null,
    "vat_rate": 5
  }
];



}
