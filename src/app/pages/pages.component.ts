import { Component, OnInit, HostListener, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { Category } from '../app.models';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { MarketTypeDataService } from '../shared/market-type-data.service';
import { CartDataService } from './cart/cart-data.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ SidenavMenuService , MarketTypeDataService ]
})
export class PagesComponent implements OnInit {
  public showBackToTop:boolean = false;
  public categories:Category[];
  public category:Category;
  public marketTypeData;
  public sidenavMenuItems:Array<any>;
  @ViewChild('sidenav') sidenav:any;

  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public appService:AppService, private cartDataService:CartDataService, 
              public sidenavMenuService:SidenavMenuService,
              public marketTypeDataService:MarketTypeDataService,
              public router:Router,
              private spinner: NgxSpinnerService
  ) {
    this.settings = this.appSettings.settings; 
    this.settings.theme = Settings.colors[localStorage.getItem('market')?localStorage.getItem('market'):1]
  }
  public products=[];
  public cart;
  ngOnInit() {
    this.getCategories();
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
    this.marketTypeData = this.marketTypeDataService.getMarketTypeData();
    this.cartDataService.cart.subscribe(cart => {
      this.cart = cart;
      console.log(cart);
    });
  } 

  public getCategories(){    
    this.appService.getCategories().subscribe(data => {
      this.categories = data;
      this.category = data[0];
      this.appService.Data.categories = data;
    })
  }

  public changeCategory(event){
    if(event.target){
      this.category = this.categories.filter(category => category.name == event.target.innerText)[0];
    }
    if(window.innerWidth < 960){
      this.stopClickPropagate(event);
    } 
  }

  public remove(product) {
    this.appService.removeFromCart(product);
  }

  public clear(){
    this.appService.clearCart();
  }


  public changeTheme(theme){
    this.settings.theme = theme;       
  }

  public stopClickPropagate(event: any){
    event.stopPropagation();
    event.preventDefault();
  }

  public search() {
      this.spinner.show();
      // this.spinner.hide();
  }

 
  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => { window.scrollTo(0,0) });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;  
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        this.sidenav.close(); 
      }                
    });
    this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
  }

  public closeSubMenus(){
    if(window.innerWidth < 960){
      this.sidenavMenuService.closeAllSubMenus();
    }    
  }

}