import { Component, OnInit, Input } from '@angular/core';
import { RTSystem } from 'src/app/models/RealTime';
import { _ } from 'underscore';

@Component({
  selector: 'app-evolution-chart',
  templateUrl: './evolution-chart.component.html',
  styleUrls: ['./evolution-chart.component.css']
})
export class EvolutionChartComponent implements OnInit {

  @Input() public system: RTSystem;
  private planningReady:string = "Not ready";
  public taskIds:number[];
  public scheduling:any;

  constructor() { }

  ngOnInit() {
    this.planningReady = "It is ready to rumble!!!";
    this.scheduling = this.system.getRMScheduling();
    this.taskIds = _.map(this.system.getTasks(), item => item.getId());
  }

}
