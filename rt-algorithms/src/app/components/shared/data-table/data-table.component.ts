import { Component, OnInit, Input } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() public headers: string[];
  @Input() public rows: string[][];
  @Input() public tableWidth: string;

  constructor() { 
    this.headers = [];
    this.rows = [];
  }

  ngOnInit() {
    if (this.tableWidth == undefined || this.tableWidth == null || this.tableWidth == ""){
      throw "DataTable component requires a valid width (Include px, %, etc)";
    }
  }

}
