import { Component, OnInit } from '@angular/core';
import { AddressesService } from './addresses.service'
import { MarketsService } from './markets.service'
import { MarketTypeDataService } from '../shared/market-type-data.service'
import { AppService } from '../app.service';
import {  MapService } from '../shared/map/map.service'


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [AddressesService,MarketsService,MarketTypeDataService,MapService]
})
export class LandingPageComponent implements OnInit {

  constructor(private addressesService : AddressesService,
              private marketsService:MarketsService,
              private appService:AppService, private mapService:MapService,
              private marketTypeDataService:MarketTypeDataService ) { 

    
  }
  addresses =[];
  district = '';
  city = '';
  location={};
  selectedAddress={};
  markets = [];
  addressName;
  decription;
  noService = false;
  defualtAddress = 1;
  ngOnInit() {

    this.selectedAddress =JSON.parse(localStorage.getItem('address'));

    if(this.selectedAddress){
      this.addressesService.getAddresses().subscribe(
        data=>{
          this.addresses = data['data'];
          this.addresses.forEach(obj=>{
            if(this.selectedAddress['id']==obj['id'])
                  this.selectedAddress = obj;
                })
          });

      this.marketsService.getMarkets().subscribe(data=>{
              this.markets = data['data'];
              this.noService = !this.markets.length ;
          });

      this.addressesService.getAddress(localStorage['lat'],localStorage['lng'])
          .subscribe(data =>{            
              this.district = data['district'];
              this.city = data['city'];
          } );
  
          this.mapService.getGeoCode({'lat':localStorage['lat'],'lng':localStorage['lng']}).subscribe(
          res=>{
              if(res['results'] && res['results'][0] && res['results'][0]['formatted_address'])
                  this.decription = res['results'][0]['formatted_address']  
          }
        );        

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
        localStorage.setItem('lng',this.location['longitude']);
        localStorage.setItem('lat',this.location['latitude']);
        this.marketsService.getMarkets().subscribe(data=>{
            this.markets = data['data'];
            this.noService = !this.markets.length ;

        });
        this.mapService.getGeoCode({'lat':this.location['latitude'],'lng':this.location['longitude']}).subscribe(
          res=>{
              if(res['results'] && res['results'][0] && res['results'][0]['formatted_address'])
                  this.decription = res['results'][0]['formatted_address']  
          }
        );        
        this.addressesService.getAddress(this.location['latitude'],this.location['longitude'])
        .subscribe(data =>{            
            this.district = data['district'];
            this.city = data['city'];
        } );

        
      });
    }  
  }

  getOpenedMarkets(){
    
    localStorage.setItem('lng',this.selectedAddress['longitude']);
    localStorage.setItem('lat',this.selectedAddress['latitude']);

    localStorage.setItem('address',JSON.stringify(this.selectedAddress));

    this.marketsService.getMarkets().subscribe(data=>{
            this.markets = data['data'];
            this.noService = !this.markets.length ;            
      });
  
    this.addressesService.getAddress(this.selectedAddress['latitude'],this.selectedAddress['longitude'])
      .subscribe(data =>{            
        console.log(data);
          this.district = data['district'];
          this.city = data['city'];
      } );

  }

  selectType(data){
      this.marketTypeDataService.setMarketTypeData(data);
      localStorage.setItem('market',data.id);
      localStorage.setItem('color',data['color']);
      localStorage.setItem('selectedMarket',JSON.stringify(data));
      this.appService.color = data['color'];
  }




}
