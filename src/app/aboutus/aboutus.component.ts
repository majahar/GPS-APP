import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }
  userInfo;
  showLogoutButton : boolean=false;

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('userInfo');
    if(this.userInfo == null || this.userInfo == undefined || this.userInfo == "" ||    this.userInfo.lenght == 0){

      this.showLogoutButton=false;
      }
      else{
      this.showLogoutButton=true;

      }

  }

}
