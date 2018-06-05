import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg', slug: 'en' },
    { name:'Arabic', image: 'assets/images/flags/sa.svg', slug: 'ar' }
  ];
  public flag:any;

  constructor(public appService:AppService) { }

  ngOnInit() {
    this.flag = this.flags[0];
  }


  public changeLang(flag) {
    this.flag = flag;
    localStorage.setItem('lang', this.flag.slug);
  }

  

}
