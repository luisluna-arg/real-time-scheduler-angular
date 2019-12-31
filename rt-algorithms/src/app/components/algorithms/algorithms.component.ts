import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RTSystem } from '../../models/RealTime';
import { _ } from 'underscore';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.css']
})
export class AlgorithmsComponent implements OnInit {
  
  private systemText: string;

  @Input()
  public system: RTSystem;

  constructor() {
  }

  ngOnInit() {
  }

  public getTaskTiming() {
    if (this.system == null || this.system == undefined) return [[]];

    let taskTiming = this.system.getTaskTiming();
    return _.map(taskTiming, function (item:any) {
      return [ 'Tarea ' + (taskTiming.indexOf(item) + 1), item] 
    });
  }

}
