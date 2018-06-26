import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from './categories.component';
import {ProductsComponent} from '../../pages/products/products.component';
import {ProductComponent} from '../../pages/products/product/product.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from '../shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';

export const routes = [
    { path: 'products/:id', component: ProductComponent },
    { path: ':name/:id/products/:name/:id', component: ProductComponent },
    { path: 'products', component: ProductsComponent, pathMatch: 'full' },
    { path: 'category/:name/:id', component: ProductsComponent, pathMatch: 'full' },
    { path: 'category/:name/:id/sub/:name/:id', component: ProductsComponent, pathMatch: 'full' },
    { path: '', component: ProductsComponent, pathMatch: 'full' },
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
      ProductComponent,
      ProductsComponent,
  ],
    entryComponents:[
       CategoriesComponent
    ]

})
export class CategoriesModule { }