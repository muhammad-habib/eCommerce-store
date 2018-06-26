import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';

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
    ProductsComponent, 
    ProductComponent, 
    ProductZoomComponent, ProductListItemComponent
  ],
  entryComponents:[
    ProductZoomComponent
  ]
})
export class ProductsModule { }
