import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _backendService: BackendService, private _route: Router) { }
userInfo;
showLogoutButton : boolean=false;


  ngOnInit(): void {
  
  }
  logout(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userInfo");
    this.showLogoutButton=true;
    this._route.navigate(['/login']);
  }
  get isLoggedIn() { return this._backendService.isLoggedIn(); }


}
