import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListAddressesComponent } from './list-addresses.component';
import { SharedModule } from '../../shared/shared.module';
import { AddressComponent } from '../address/address.component'

export const routes = [
  { path: '', component:ListAddressesComponent , pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    ListAddressesComponent,
    AddressComponent
  ]
})
export class ListAddressesModule { }
