import { Component, OnInit, Input } from '@angular/core';
import { RTSystem } from 'src/app/models/RealTime';
import { _ } from 'underscore';

@Component({
  selector: 'app-algorithms-result',
  templateUrl: './algorithms-result.component.html',
  styleUrls: [
    '../shared/algorithms.css',
    './algorithms-result.component.css'
  ]
})
export class AlgorithmsResultComponent implements OnInit {

  @Input()
  public system: RTSystem;

  constructor() { }

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
