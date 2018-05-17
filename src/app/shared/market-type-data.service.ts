import { Injectable } from '@angular/core';

@Injectable()
export class MarketTypeDataService {
  
  marketTypeData= {};

  constructor() { }

    setMarketTypeData(data){
        this.marketTypeData =data; 
    }
    getMarketTypeData(){
      return this.marketTypeData;
    }

}
