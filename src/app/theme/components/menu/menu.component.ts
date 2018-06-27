import { Component, OnInit} from '@angular/core';
import {AppService} from '../../../app.service';
import { LocalStorageObject } from '../../../locale-storage'
import { PlatformService } from '../../../platform.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  constructor( public appService:AppService,private platformService:PlatformService) { }
  ngOnInit() { 
     this.appService.logedIn = LocalStorageObject.getItem('user')?true:false;

  }

  openMegaMenu(){
    if(this.platformService.isBrowser){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
    }
  }

}
