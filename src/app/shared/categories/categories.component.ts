import { Component,Input, Output, OnInit, EventEmitter  } from '@angular/core';
import { CategoriesService } from './categories.service'
import { AppService } from '../../app.service';

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
  public selectedCat = 0;
  public hover = false;
  constructor(private categoriesService : CategoriesService,private appService:AppService) { }

  ngOnInit() {
    this.selectedCat = this.inputSelectedCat;
    this.getCategories();
    this.getSubCategories(this.selectedCat);

  }

  public getCategories(){    
    this.categoriesService.getCategories(this.hyper,this.market).subscribe(data=>{
      this.categories = data['data']; 
    });
  }
  public getSubCategories(category_id){  
    if (category_id == 0){
      this.subCategories=[];
      this.selectedCat = 0;
      return;
    }
    this.categoriesService.getSubCategories(this.hyper,category_id).subscribe(data=>{
      this.subCategories = data['data']; 
    });
  }

  public filterBy(category_id,sub_category_id){

    this.selectedCat = category_id?category_id:this.selectedCat;
    this.selectedSubCat = sub_category_id?sub_category_id:this.selectedSubCat;
    console.log("cat:"+category_id,"sub"+sub_category_id);

    this.changeCategory.emit({category_id:category_id,sub_category_id:sub_category_id});
  }

}
