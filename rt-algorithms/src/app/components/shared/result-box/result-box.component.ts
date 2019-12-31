import { Component, OnInit, Input } from '@angular/core';
import { RTSystem } from 'src/app/models/RealTime';

@Component({
  selector: 'app-result-box',
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.css']
})
export class ResultBoxComponent implements OnInit {

  @Input() public value:any;
  @Input() public boxId:string;
  @Input() public inputTooltip:string;
  @Input() public system: RTSystem;
  @Input() public label: string;
  @Input() public isValidForCota:boolean = null;

  constructor() { 
    this.inputTooltip = "TESTING TOOLTIP";    
  }

  public setSystem(system: RTSystem){
    this.system = system;
  }

  ngOnInit() {
  }

}
