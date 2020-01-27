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
    this.internalSystemText = "(2,5,5),(1,8,8),(2,12,12),(2,13,13)";
  }

  ngOnInit() {
    // this.onClick_Evaluate();
  }

  public onClick_Evaluate() {
    this.systemInstance = new RTSystem(this.internalSystemText);
    this.system.emit(this.systemInstance);
  }

}
