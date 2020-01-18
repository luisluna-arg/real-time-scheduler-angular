import { Component, OnInit, Input } from '@angular/core';
import { RTSystem } from 'src/app/models/RealTime';

@Component({
  selector: 'app-scheduling-result',
  templateUrl: './scheduling-result.component.html',
  styleUrls: ['./scheduling-result.component.css']
})
export class SchedulingResultComponent implements OnInit {

  @Input() public system: RTSystem;
  
  constructor() { }

  ngOnInit() {
  }

}
