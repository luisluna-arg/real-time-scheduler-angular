import { Component, OnInit, Input } from '@angular/core';
import { RTSystem } from 'src/app/models/RealTime';

@Component({
  selector: 'app-result-box',
  templateUrl: './result-box.component.html',
  styleUrls: [
    './result-box.component.css',
    './../../../shared/css/shared-style.css'
  ]
})
export class ResultBoxComponent implements OnInit {

  @Input() public value:any;
  @Input() public boxId:string;
  @Input() public inputTooltip:string;
  @Input() public system: RTSystem;
  @Input() public label: string;
  @Input() public showResult:boolean = false;
  @Input() public isGoodResult:boolean = false;

  constructor() { 
  }

  public setSystem(system: RTSystem){
    this.system = system;
  }

  ngOnInit() {
  }

}
