import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Homy Web';

  constructor(private router: Router) {




  }

  ngOnInit(): void {


  }

  isAdminPannel() {
    if (this.router.url === '/adminPannel') {
      return true;
    } else {
      return false;
    }
  }

  isLogin() {
    if (this.router.url === '/adminLogin') {
      return true;
    } else {
      return false;
    }

  }

  isAdduser() {

    if(this.router.url === '/addUser') {
      return true;
    } else {
      return false;
    }

  }

  isManageUserProfile() {
    if(this.router.url === '/manageUserProfile') {
      return true;
    } else {
      return false;
    }

  }

  isUserDataView() {

    if(this.router.url === '/userDataView/'+ localStorage.getItem("deviceId")) {
      return true;
    } else {
      return false;
    }
  }

  isForgetpassowrd() {
    if(this.router.url === '/forgetPassword') {
      return true;
    }else {
      return false;
    }
  }


}
