import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from "../../app.models";
import { ProductsService} from './products.service' 
import { ChangeEvent, VirtualScrollComponent } from 'angular2-virtual-scroll';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 20;
  public counts = [12, 24, 36];
  public count:any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort:any;
  public products: Array<Product> = [];
  public categories:Category[];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#000000"];
  public sizes = ["S","M","L","XL","2XL","32","36","38","46","52","13.3\"","15.4\"","17\"","21\"","23.4\""];
  public page:any;
  public currency = "ريال";
  public market_id = 1 ; 
  public is_hyper = 1 ; 

  public current = 1;
  public lastPage;
  public total;
  public loading=false;
  public filter = {};
  public category_id=0;
  public fixedHeader= false;
  public slides = [];

  public isOffers = false;
  public query;
  public queryProducts;

  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;
  dataPassed: any;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private location:Location,
               public appService:AppService, private productsService:ProductsService,
               public dialog: MatDialog, private router: Router,
               private spinner: NgxSpinnerService) {
                }

  ngOnInit() {
      console.log('hiiiiiiiiiiiiiiiiiiiiiii');
    this.activatedRoute.data.subscribe(data=>{
        this.isOffers = (data.offers == true);
    });
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
        this.query = params.query?params.query:'';
        this.market_id = params.market?params.market:1;
        localStorage.setItem('market', '' + (this.market_id));
        this.is_hyper = params.hyper?params.hyper:1;
        let content_type  = params.content_type;
        if(content_type == "category"){
          this.category_id = params.content_id;
          this.filter['category_id'] = this.category_id;
        }
    });
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    if(window.innerWidth < 1280) {
      this.viewCol = 33.3;
    };
    this.appService.readCartFromLocalStorage();
    this.appService.refreshCart();
    this.getCategories();
    if(this.query)
    {
      this.searchProducts();
    }
    else{
        // subscribe to home component messages
        this.subscription = this.appService.getData().subscribe(x => {
            this.dataPassed = x;
            this.filter['category_id'] = this.dataPassed;
            this.getProducts();
            console.log(this.dataPassed, 'fffffffffffvvvvvvvvvvvvvvvvvvvvvvvvvvvvtttttt');
        });
        this.getProducts();
        if(this.isOffers)
            this.getOffersAds();
        // this.location.replaceState('?category=15');
    }
  }

  public getProducts() {
    this.spinner.show();
    console.log("a7aaaaaaaaaaaaaaaaaaaaaaaaa");
    this.productsService.getProducts(this.is_hyper,this.market_id,this.filter,this.isOffers).subscribe(res=>{
      this.products = this.products = res['data']['data'];
      this.current = res['data']['current_page'];
      this.total = res['data']['total'];
      this.lastPage = res['data']['last_page'];
      this.spinner.hide();
      // this.virtualScroll.refresh();
      // this.virtualScroll.update.emit(this.products);
        console.log(this.products);
    },err=>{
      this.spinner.hide();
    });
  }

  public getCategories(){  
    if(this.appService.Data.categories.length == 0) { 
      this.appService.getCategories().subscribe(data => {
        this.categories = data;
        this.appService.Data.categories = data;
      });
    }
    else{
      this.categories = this.appService.Data.categories;
    }
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count){
    this.count = count;
  }

  public changeSorting(sort){
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product){   
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]); 
      }
    });
  }

  public onPageChanged(event){
      // this.page = event;
      // window.scrollTo(0,0); 
  }

  public onChangeCategory(event){
    if(event.target){
      this.router.navigate(['/products', event.target.innerText.toLowerCase()]); 
    }   
  }


  public filterByCategory(cat){
      this.filter['category_id'] = cat.category_id;
      this.filter['sub_category_id'] = cat.sub_category_id;
      this.filter['page']= 1 ;
      this.products = [];
      this.getProducts();
  }

    @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
      //In chrome and some browser scroll is given to body tag
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.

        this.fixedHeader = (pos >= 600);
      // console.log(pos);

      if (this.current >= this.lastPage) 
        return;
    

      if(pos >= max && !this.query )   {
        this.filter['page']= ++this.current ;
        this.getProducts();    
      }
    }

    private getOffersAds(){
          this.productsService.getOffersAds().subscribe(res=>{
             let tempAds = res['data'];
             tempAds.forEach(element => {
              this.slides.push({
                 title: '', 
                 subtitle: '', 
                 image: element                  
              });
             });
          })
    }

    searchProducts() {
    this.spinner.show();
        this.productsService.searchProducts(this.query).subscribe(data=> {
            this.queryProducts = data['data'];
            this.queryProducts.map(o => {
                this.products.push(o.products);
                this.products = [].concat.apply([], this.products);
            });
            this.spinner.hide();
        });
    }

}
