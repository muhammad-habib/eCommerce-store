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

  @Output() change: EventEmitter<any> = new EventEmitter();

  public categories=[];
  
  constructor(private categoriesService : CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories(){    
    this.categoriesService.getCategories(this.hyper,this.market).subscribe(data=>{
      this.categories = data['data']; 
    });
  }
  public getSubCategories(){    
    this.categoriesService.getSubCategories(this.hyper,this.market).subscribe(data=>{
      this.categories = data['data']; 
    });
  }

}
