import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service'
import { MarketsService } from './markets.service'
import { MarketTypeDataService } from '../shared/market-type-data.service'
import { AppService } from '../app.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [AddressesService,MarketsService,MarketTypeDataService]
})
export class LandingPageComponent implements OnInit {

  constructor(private addressesService : AddressesService,
              private marketsService:MarketsService,
              private appService:AppService,
              private marketTypeDataService:MarketTypeDataService ) { 

    
  }
  addresses =[];
  district = '';
  city = '';
  location={};
  selectedAddress={};
  markets = [];

  ngOnInit() {
    // navigator.geolocation.getCurrentPosition(position => {
    //   console.log(position); 
    //   this.location = position.coords;
    //   console.log(this.location); 
    //   console.log(this.location['longitude']); 
    // });

    this.selectedAddress =JSON.parse(localStorage.getItem('address'));

    if(this.selectedAddress){
      this.addressesService.getAddresses().subscribe(
        data=>{
          this.addresses = data['data'];
          this.addresses.forEach(obj=>{
            if(this.selectedAddress['id']==obj['id'])
                  this.selectedAddress = obj;
                })
          } );

      this.marketsService.getMarkets().subscribe(data=>{
              this.markets = data['data'];
          });
        return;  
    }

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
          if(this.addresses)  
          {
            this.getLocation();
          }
        }
      );
    }

   
  }



  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        console.log(this.location['longitude']);
        console.log(this.location['latitude']);
        localStorage.setItem('long',this.location['longitude']);
        localStorage.setItem('lat',this.location['latitude']);
        this.marketsService.getMarkets().subscribe(data=>{
            this.markets = data['data'];
        });

        this.addressesService.getAddress(this.location['longitude'],this.location['latitude'])
        .subscribe(data =>{            
            this.district = data['district'];
            this.city = data['district'];
        } );

        
      });
    }  
  }

  getOpenedMarkets(){
    
    console.log(this.selectedAddress['longitude'],this.selectedAddress['latitude']);
    localStorage.setItem('long',this.selectedAddress['longitude']);
    localStorage.setItem('lat',this.selectedAddress['latitude']);

    localStorage.setItem('address',JSON.stringify(this.selectedAddress));

    this.marketsService.getMarkets().subscribe(data=>{
            this.markets = data['data'];
      });
  
  }

  selectType(data){
      this.marketTypeDataService.setMarketTypeData(data);
      localStorage.setItem('market',data.id);
      localStorage.setItem('color',data['color']);
      this.appService.color = data['color'];
  }




}
