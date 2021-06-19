import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule , ActivatedRoute } from '@angular/router';
import {UserDataFilteringServiceService} from '../Services/user-data-filtering-service.service'
import {UserData} from '../userSave.model'
import {User} from "../user.model";
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms'
import {LogoutComponent} from '../logout/logout.component'
import {MustMatch} from "../custom.passwordValidatorMatcher";

@Component({
  selector: 'app-user-data-view',
  templateUrl: './user-data-view.component.html',
  styleUrls: ['./user-data-view.component.css']
})
export class UserDataViewComponent implements OnInit {

  userData: User;
  registerForm: FormGroup;
  submitted = false;
  UpdatedEmail:string;
  updatedContactNumber:string;
  updateError:boolean = false;
  sucess:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private userDataFilteringService:UserDataFilteringServiceService, private formBuilder: FormBuilder, private logoutComponent:LogoutComponent) { }

  ngOnInit(): void {
    this.userDataFilteringService.findUserDatabyDeviceId(localStorage.getItem('deviceId')).subscribe(data=>{
      this.userData=data;
      console.log(this.userData.deviceId)
    })

    this.registerForm = this.formBuilder.group({
      contactNumber: ['', [Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{3})(?: *x(\\d+))?\\s*$')]],
      email: ['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
    });

  }

  get f() { return this.registerForm.controls;}

  onSubmitUpdateForm() : void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.updatedContactNumber = this.f.contactNumber.value;
    this.UpdatedEmail = this.f.email.value;

    console.log(this.UpdatedEmail)
    console.log(this.updatedContactNumber)


    const body = {
      "email": this.UpdatedEmail,
      "contactNumber": this.updatedContactNumber,
    };

    this.userDataFilteringService.updateUserData(this.userData.userId, body).subscribe(data => {
            console.log(data);
            if(data == null){
              this.updateError = true;
              this.sucess = false;
            }else{
              this.sucess = true;
              this.updateError = false;
            }
    })

  }

  Logout(){
    this.logoutComponent.logout();
  }


}
