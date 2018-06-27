import { Component,Input, Output, OnInit, EventEmitter, OnDestroy  } from '@angular/core';
import { CategoriesService } from './categories.service'
import { AppService } from '../../app.service';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {switchMap} from 'rxjs/operators';

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
  constructor(
      private categoriesService: CategoriesService,
      public appService:AppService,
      private router: Router,
      private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
      this.selectedCat.id = 0;
      this.router.events.subscribe((event: any) => {
          let r = this.route;
          while (r.firstChild) {
              r = r.firstChild;
          }
          r.params.subscribe(params => {
              if (params.catId) {
                  this.selectedCat.id = params.catId;
                  this.selectedSubCat = params.subId;
              }
          });
      });
      this.getCategories();
  }

  public getCategories() {
    this.categoriesService.getCategories(this.hyper,this.market).subscribe(data=>{
      this.categories = data['data'];
      if (this.selectedCat.id) {
          this.getSubCategories(this.selectedCat.id);
      }
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
    this.selectedCat.id = category.id?category.id:this.selectedCat.id;
    this.selectedCat.name = category.name?category.name:this.selectedCat.name;
    this.selectedSubCat = sub_category_id?sub_category_id:this.selectedSubCat;
    this.appService.sendData({category_id:category.id,sub_category_id:sub_category_id});
  }

}
