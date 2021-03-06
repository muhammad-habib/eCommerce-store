import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../../landing-page/addresses.service'
import { Router } from '@angular/router';
import { LocalStorageObject } from '../../locale-storage'

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  providers: [AddressesService]
})
export class AddAddressComponent implements OnInit {

  public addressName="";
  public addressDescription="";
  public coords={lat:24.697928383314334,lng:46.67921519513561};
  constructor(private addressesService:AddressesService,
              private router:Router) 
    { }
  public formatted_address
  ngOnInit() {
      this.coords.lat =Number(LocalStorageObject.getItem('lat'));
      this.coords.lng =Number(LocalStorageObject.getItem('lng'));  
  }
  changeLocation(formatted_address){
    this.formatted_address = formatted_address['address'];
  }

  changeCoords(coords){
      this.coords = coords;
  }
  submitNewAddress(){
        this.addressesService.saveNewAddress(this.coords,this.addressName,this.addressDescription)
            .subscribe(res=>{
                this.router.navigate(['/addresses/list']); 
            },err=>{
              console.log("error");
            });
  }

}
