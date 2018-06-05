import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { MapService } from './map.service'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapService]

})
export class MapComponent implements OnInit {

  public lat: number = 24.697928383314334;
  public lng: number = 46.67921519513561;
  public zoom: number = 12;
  // @Input() lat; 
  // @Input() lng; 
  // @Input() zoom; 
  @Input() centerMarker = false ;  
  @Output() changeLocation : EventEmitter<any> = new EventEmitter()
  @Output() changeCoords : EventEmitter<any> = new EventEmitter()


  constructor( private mapService:MapService) { }

  ngOnInit() {
  }

  selectLocation(coords){
//      console.log(coords);
  }
  mapDragEnd(coords){
    console.log(coords);
    this.changeCoords.emit(coords);        

    this.mapService.getGeoCode(coords).subscribe(
      res=>{
        console.log(res['results'][0]['formatted_address']);
        if(res['results']&&res['results'][0] && res['results'][0]['formatted_address'])
        this.changeLocation.emit({address:res['results'][0]['formatted_address']});        
      },
      err=>{
        console.log(err);
      }
    );

    setTimeout(()=>{  }, 3000);
  }

}
