import { Component, OnInit } from '@angular/core';
import {UserDataFilteringServiceService} from '../Services/user-data-filtering-service.service'
import {LogoutComponent} from '../logout/logout.component'
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms'
import {MustMatch} from '../custom.passwordValidatorMatcher'
import {UserData,DeviceStatus} from '../userSave.model'



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  generatedDeviceId: string = "Device ID";
  user:UserData = new UserData();
  regErrorCondition:boolean;
  regErrorMessage:string;


  constructor(private userDataFilteringServiceService:UserDataFilteringServiceService, private logoutComponent:LogoutComponent, private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      userType:['',],
      contactNumber: ['', [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{3})(?: *x(\\d+))?\\s*$')]],
      email: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.f.userType.setValue("User Type");

  }

  Logout() : void {
    this.logoutComponent.logout();
  }



  reloadPage() {
    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/addUser';
  }

  getGeneraterandomDeviceId(): void {

      this.userDataFilteringServiceService.getGeneratedDeviceId().subscribe(data =>{

        if(data['deviceID'] === "false"){
          this.generatedDeviceId = "Please Re-Generate Device ID"
        }else {
          this.generatedDeviceId = data['deviceID'];
        }

      },error => {
        this.Logout();
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }


    const body = {

      "userName": this.f.username.value,
      "password": this.f.password.value,
      "deviceId": this.generatedDeviceId,
      "email": this.f.email.value,
      "contactNumber": this.f.contactNumber.value,
      "activeStatus": 0,
      "userType":this.f.userType.value,
      "deviceStatusList": [
        {
          "socket1_Status": 0,
          "socket2_Status": 0,
          "socket3_Status": 0,
          "socket4_Status": 0,
          "motionSensor_Status": 0,
          "syncStatus": 0,
          "lastSyncDate": "-",
          "lastSyncTime": "-"

        }
      ]
    };



    if(this.generatedDeviceId == "Device ID") {

      this.regErrorCondition = true;
      this.regErrorMessage = "Before register the user , system wants to generate device id , please click Generate Device Id button to generate it"

    }else if(this.generatedDeviceId == "Try again !") {

      this.regErrorCondition = true;
      this.regErrorMessage = "Please try again and re-generate the device id, Press Generate Device Id button to generate the device id again "

    }else if(this.f.userType.value == "User Type"){
      this.regErrorCondition = true;
      this.regErrorMessage = "Before register user with the system you wants to select user type , please select user type (Admin / User )"

    }else{

      this.userDataFilteringServiceService.saveUserData(body).subscribe(data =>{
        console.log(data);
        if(data["saveStatus"] == "UsernameFoundException") {
          this.regErrorCondition = true;
          this.regErrorMessage = "This username is already registered with this system , please try with different username"

        }else if(data["saveStatus"] == "EmailFoundException"){
          this.regErrorCondition = true;
          this.regErrorMessage = "This email is already registered with this system, please try with different email"
        }else if (data["saveStatus"] == "SaveSucess"){

          this.regErrorCondition = false;
          this.regErrorMessage = "User successfully registered with the system"
          this.reloadPage();

        }

      })

    }

  }


}




