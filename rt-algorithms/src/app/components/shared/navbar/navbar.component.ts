import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router
  ) { 

  }

  ngOnInit() {
  }

  searchMusician(value:string){
    if (this._router.navigated) this._router.navigated = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/search', value]);
    });
    
  } 

}
