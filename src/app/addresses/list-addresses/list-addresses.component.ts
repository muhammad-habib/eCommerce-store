import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../../landing-page/addresses.service'
import { MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageObject } from '../../locale-storage'


@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.scss'],
  providers: [AddressesService]
})
export class ListAddressesComponent implements OnInit {
  public addresses=[];
  constructor(private addressesService:AddressesService,private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,private router:Router
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.addressesService.getAddresses().subscribe(
      res=>{
        this.addresses = res['data'];
        this.spinner.hide();
      },
      err=>{
        this.spinner.hide();
      })
  }

  deleteAddress(address){
    this.spinner.show();
      this.addressesService.deleteAddress(address.id).subscribe(
        res=>{
          this.spinner.hide();
          this.snackBar.open('Delete Success', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          for(let i=0;i<this.addresses.length;i++){
            if(this.addresses[i].id==address.id){
              this.addresses.splice(i,1);
            }
          }
        },err=>{
          this.spinner.hide();
        })
  }

  selectAddress(address){
      LocalStorageObject.setItem('lng',address['longitude']);
      LocalStorageObject.setItem('lat',address['latitude']);
      LocalStorageObject.setItem('address',JSON.stringify(address));
      this.router.navigate(['/']); 
  }

}
