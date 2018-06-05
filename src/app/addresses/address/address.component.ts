import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { MapService } from '../../shared/map/map.service'
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [MapService]
})
export class AddressComponent implements OnInit {

  @Input() address;
  @Output() deleteAddress : EventEmitter<any> = new EventEmitter()
  @Output() selectAddress : EventEmitter<any> = new EventEmitter()

  public decription="";
  constructor(public mapService:MapService) { }

  ngOnInit() {
    this.mapService.getGeoCode({'lat':this.address.latitude,'lng':this.address.longitude}).subscribe(
      res=>{
          if(res['results'] && res['results'][0] && res['results'][0]['formatted_address'])
              this.decription = res['results'][0]['formatted_address']  
      }
    )
  }
  public delete(){
    this.deleteAddress.emit(this.address);
  }
  public select(){
    this.selectAddress.emit(this.address);
  }

}
