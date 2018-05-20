import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';


export const routes = [
    { path: '', component: OrdersComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrdersComponent]
})
export class OrdersModule { }
