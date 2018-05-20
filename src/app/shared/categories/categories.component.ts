import { Component,Input, Output, OnInit, EventEmitter  } from '@angular/core';
import { CategoriesService } from './categories.service'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers:[CategoriesService]
})
export class CategoriesComponent implements OnInit {

  @Input() hyper  = 1 ;
  @Input() market = 1 ;

  @Output() changeCategory: EventEmitter<any> = new EventEmitter();

  public categories=[];
  public subCategories=[];
  
  constructor(private categoriesService : CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories(){    
    this.categoriesService.getCategories(this.hyper,this.market).subscribe(data=>{
      this.categories = data['data']; 
    });
  }
  public getSubCategories(category_id){  
    if (category_id == 0){
      this.subCategories=[];
      return;
    }
    this.categoriesService.getSubCategories(this.hyper,category_id).subscribe(data=>{
      this.subCategories = data['data']; 
    });
  }

  public filterBy(category_id,sub_category_id){

    this.changeCategory.emit({category_id:category_id,sub_category_id:sub_category_id});
  }

}
