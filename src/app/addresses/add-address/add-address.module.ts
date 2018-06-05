import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddAddressComponent } from './add-address.component'
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes = [
  { path: '', component:AddAddressComponent , pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddAddressComponent
  ]
})
export class AddAddressModule { }
