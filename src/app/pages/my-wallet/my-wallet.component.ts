import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MyWalletService} from './my-wallet.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { PlatformService} from '../../platform.service'

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.scss'],
  providers:[MyWalletService]
})
export class MyWalletComponent implements OnInit {

  public myWallet: any;
  public myWalletItems: any = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  public filter = {};
  public current = 1;
  public lastPage;
  public total;
  public loading=false;
  constructor(
      private myWalletService: MyWalletService,
      private spinner: NgxSpinnerService,
      private platformService:PlatformService      
  ) { }

  ngOnInit() {

      if(window.innerWidth < 960) {
          this.sidenavOpen = false;
      }
      if(window.innerWidth < 1280){
          this.viewCol = 33.3;
      }
      this.getWallet();
      this.filter['page']= ++this.current ;
      this.getWallet();
  }

    getWallet() {
        this.spinner.show();
        this.myWalletService.getUserWallet(this.filter)
            .subscribe(
                data => {
                    this.myWallet = data['data'];
                    console.log(this.myWallet);
                    this.myWalletItems = this.myWalletItems.concat(data['data']['items']['data']);
                    this.current = data['data']['items']['current_page'];
                    this.total = data['data']['items']['total'];
                    this.lastPage = data['data']['items']['last_page'];
                    this.spinner.hide();
                },
                error => {
                });
    }

    public changeViewType(viewType, viewCol){
        this.viewType = viewType;
        this.viewCol = viewCol;
    }

    @HostListener('window:resize')
    public onWindowResize():void {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
        (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        // In chrome and some browser scroll is given to body tag
        if(this.platformService.isBrowser){
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (this.current >= this.lastPage) {
            return;
        }
        if(pos >= max )   {
            this.filter['page']= ++this.current ;
            this.getWallet();
        }
      }
    }
}
