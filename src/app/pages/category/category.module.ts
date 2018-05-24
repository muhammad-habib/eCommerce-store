import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent }from './category.component'

export const routes = [
  { path: '', component: CategoryComponent, pathMatch: 'full' },
  { path: ':id', component: CategoryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    CategoryComponent
  ]
})
export class CategoryModule { }
