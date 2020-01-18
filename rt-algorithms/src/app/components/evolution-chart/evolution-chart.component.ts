import { Component, OnInit, Input } from '@angular/core';
import { RTSystem } from 'src/app/models/RealTime';
import { _ } from 'underscore';

@Component({
  selector: 'app-evolution-chart',
  templateUrl: './evolution-chart.component.html',
  styleUrls: ['./evolution-chart.component.css']
})
export class EvolutionChartComponent implements OnInit {

  @Input() public title:string;
  @Input() public scheduling:any;
  @Input() public tasks:any[];
  public taskIds:number[];
  public taskPeriods:number[];

  constructor() { }

  ngOnInit() {
    this.taskIds = _.map(this.tasks, item => item.getId());
    this.taskPeriods = _.map(this.tasks, item => item.getPeriod());
  }

}
