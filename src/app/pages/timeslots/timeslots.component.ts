import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { TimeslotsService } from './timeslots.service'
@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrls: ['./timeslots.component.scss'],
  providers: [TimeslotsService]
})
export class TimeslotsComponent implements OnInit {

  @Output() selectTime : EventEmitter<any> = new EventEmitter()
 
  public slots=[];
  public selectedSlot;
  constructor(private timeslotsService:TimeslotsService) { }

  ngOnInit() {
    this.timeslotsService.getTimeSlots().subscribe(slots=> this.slots = slots['Times'])
  }

  selectTimeSlot(slot){
    if(slot.availability){
    this.selectedSlot=slot.id;
    this.selectTime.emit(slot.id);
  }
  }
}
