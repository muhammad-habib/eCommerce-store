import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { Settings, AppSettings } from './app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  content_id: number;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public router: Router){
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    if(! localStorage.getItem('device_id'))
        localStorage.setItem("device_id",((navigator.platform).replace(' ','')) +'-' + Date.now() +'-'+(Math.floor(Math.random() * 1000000) + 1000000) );    
   // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0,0);
      }
    }) ;


  }
}
