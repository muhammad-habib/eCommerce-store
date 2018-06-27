import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import {User} from '../../../models/User.model';
import {TopMenuService} from './top-menu.service';
import {Router} from '@angular/router';
import { LocalStorageObject } from '../../../locale-storage'


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  providers: [TopMenuService]
})
export class TopMenuComponent implements OnInit {
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg', slug: 'en' },
    { name:'Arabic', image: 'assets/images/flags/sa.svg', slug: 'ar' }
  ];
  public flag:any;
  public user:User;

  constructor(public appService:AppService, private topMenuService: TopMenuService, private router: Router) {
  }

  ngOnInit() {
    this.flag = this.flags[0];
  }

  public signOut() {
    LocalStorageObject.removeItem('user');
    this.appService.logedIn = false;
    this.redirectTo('/products');
  }


    redirectTo(uri:string) {
        this.router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(()=>
            this.router.navigate([uri]));
    }

  

}
