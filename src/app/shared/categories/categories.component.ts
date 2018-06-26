import { Component,Input, Output, OnInit, EventEmitter, OnDestroy  } from '@angular/core';
import { CategoriesService } from './categories.service'
import { AppService } from '../../app.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers:[CategoriesService]
})
export class CategoriesComponent implements OnInit {

  @Input() hyper  = 1 ;
  @Input() market = 1 ;
  @Input() inputSelectedCat;

  @Output() changeCategory: EventEmitter<any> = new EventEmitter();

  public categories=[];
  public subCategories=[];
  public selectedSubCat = 0;
  public selectedCat: any = {};
  public hover = -1;
  constructor(private categoriesService: CategoriesService,public appService:AppService) {
  }

  ngOnInit() {
    this.selectedCat.id = this.inputSelectedCat;
    this.getCategories();
    this.getSubCategories(this.selectedCat.id);
  }

  public getCategories() {
    this.categoriesService.getCategories(this.hyper,this.market).subscribe(data=>{
      this.categories = data['data']; 
    });
  }
  public getSubCategories(category_id){  
    if (category_id === 0) {
      this.subCategories=[];
      this.selectedCat.id = 0;
      return;
    }
    this.categoriesService.getSubCategories(this.hyper,category_id).subscribe(data=>{
      this.subCategories = data['data']; 
    });
  }

  public filterBy(category,sub_category_id) {
    console.log('ffffffffffffffffffff',category, this.selectedCat);

    this.selectedCat.id = category.id?category.id:this.selectedCat.id;
    this.appService.sendData(this.selectedCat.id);
    this.selectedCat.name = category.name?category.name:this.selectedCat.name;
    this.selectedSubCat = sub_category_id?sub_category_id:this.selectedSubCat;
    this.changeCategory.emit({category_id:category.id,sub_category_id:sub_category_id});
  }

}
