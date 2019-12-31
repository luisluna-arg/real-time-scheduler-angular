import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RTSystem } from '../../../models/RealTime';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {

  public systemInstance:RTSystem;
  private internalSystemText: string;

  @Output()
  public system: EventEmitter<RTSystem>;

  constructor() {
    this.system = new EventEmitter<RTSystem>();
    this.internalSystemText = "(1,2,2),(1,3,3),(1,5,5)";
  }

  ngOnInit() {
    // this.onClick_Evaluate();
  }

  public onClick_Evaluate() {
    this.systemInstance = new RTSystem(this.internalSystemText);
    this.system.emit(this.systemInstance);
  }

}
