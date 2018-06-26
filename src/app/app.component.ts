import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { Settings, AppSettings } from './app.settings';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  content_id: number;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public router: Router, private appService: AppService) {
    this.settings = this.appSettings.settings;

    (localStorage.getItem('lang'))?'':localStorage.setItem('lang','en');
    let body = document.getElementsByTagName('body')[0];
    body.dir= (localStorage.getItem('lang') == "ar")?"rtl":"ltr";   //remove the class
    if(body.dir=="rtl"){
      console.log(" direction is RTL");
      body.className="right";
    }else{
      console.log(" direction is LTR");
      body.className="left";
    }


  }

  ngOnInit() {
    if(! localStorage.getItem('device_id'))
        localStorage.setItem("device_id",((navigator.platform).replace(' ','')) +'-' + Date.now() +'-'+(Math.floor(Math.random() * 1000000) + 1000000) );
   // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh
      let user = JSON.parse(localStorage.getItem('user'));
      if (user)
          this.getUser(user.id);
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0,0);
      }
    }) ;
  }

  getUser(id) {
        this.appService.getUser(id).subscribe(data=> {
            this.appService.user = data['data'];
            console.log(this.appService.user);
        });
  }

}
