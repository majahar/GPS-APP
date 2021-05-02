import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  error: boolean = false;
  success: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  savedChanges: boolean = false;
  userData;

  /* pagination */
  p: number = 1;
  limit: number = 10;
  total: number;
  users: User[];


  constructor(private _backendService: BackendService, private _route: Router) { }

  ngOnInit(): void {
    this.getData(this.p);
  }
  getData(p: number){
    let offset = (p - 1) * this.limit;

    this.dataLoading = true;
    this.querySubscription = this._backendService.getAllUser(offset, this.limit).subscribe((res) => {
      if (res["errorCode"] > 0) {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          this.userData = res["data"];
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
  getPage(pageNo: number) {
    this.p = pageNo;
    this.getData(this.p);
  }
  ngOnDestroy(){
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
  }
  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id);
    this._route.navigate(['edit-user']);
  };
  reloadData() {
    this.getData(this.p);
  }
  deleteUser(user: User): void {
    this.dataLoading = true;
    this.querySubscription = this._backendService.deleteUser(user.id).subscribe((res) => {
      if (res["errorCode"] > 0) {
          this.error = false;
          this.success = true;

          this.errorMessage = "";
          this.successMessage = res["errorMessage"];
          this.dataLoading = false;
         // this.userData = res["data"];
         // this._route.navigate(['users']);
          this.reloadData();

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
  };

}
