import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import {OrdersComponent} from './orders.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderComponent } from './order/order.component';

export const routes = [
    { path: '', component: OrdersComponent, pathMatch: 'full' },
    { path: ':id', component: OrderComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        SwiperModule,
        NgxPaginationModule,
        SharedModule,
        PipesModule
    ],
    declarations: [
        OrdersComponent,
        OrderItemComponent,
        OrderComponent,
    ],
    entryComponents:[
    ]
})
export class OrdersModule { }
