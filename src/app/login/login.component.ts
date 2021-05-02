import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;

  constructor(private _backendService: BackendService, private _route: Router) { }
  ngOnInit(): void {
  }
   login(formData){
    this.dataLoading = true;
    this.querySubscription = this._backendService.login(formData).subscribe((res) => {
        if (res["errorCode"] > 0) {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          window.localStorage.setItem('token', res["data"].token);
          window.localStorage.setItem('userInfo', res["data"].info.firstName);
          this._route.navigate(['/aboutus']);
      } else {
          this.error = true;
          this.errorMessage = res["errorMessage"];
          this.dataLoading = false;
      }
  },
      (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
      },
      () => {
          this.dataLoading = false;
      });
}
isLoggedIn() {
    if (localStorage.getItem('userInfo')) {
      return true;
    }
    return false;
  }

}
