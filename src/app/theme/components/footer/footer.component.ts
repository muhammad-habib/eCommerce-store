import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public lat: number = 24.8180336;
  public lng: number = 46.6418812;
  public zoom: number = 12;

  constructor(private appService:AppService) { 
    console.log(appService.color);
  }

  ngOnInit() { 

  }

  subscribe(){ }

}