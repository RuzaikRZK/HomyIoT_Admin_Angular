import { Component, OnInit } from '@angular/core';
import {accessTokeDetails,LoginServiceService} from '../Services/login-service.service'
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms'
import {MustMatch} from "../custom.passwordValidatorMatcher";
import {UserDataFilteringServiceService} from "../Services/user-data-filtering-service.service";
import {Routes, RouterModule, Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  Error: boolean;
  success:boolean= false;

  userName:string |undefined;
  password = null;
  validUser =false;
  validationMessage:string | undefined;

  apiResponse: accessTokeDetails | undefined;


  constructor(private loginService:LoginServiceService, private formBuilder: FormBuilder, private userDataFilteringServiceService:UserDataFilteringServiceService, private router:Router) { }

  ngOnInit(): void {


    this.registerForm = this.formBuilder.group({

      email: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],

    });


  }


  get f() { return this.registerForm.controls; }


  submitForgetPassowrdEmail():void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const body = {
      "email": this.f.email.value,
    };

    this.Error = false;
    this.userDataFilteringServiceService.getResetCodeforForgetPassoword(body).subscribe(data =>{
        if(data['status'] == null){
          this.Error = true;
          this.success = false;
        }else if(data['status'] != null){
          this.Error = false;
          localStorage.setItem("resetPin",data['status']);
          localStorage.setItem("userEmail",this.f.email.value);
          this.forgetPasswordPage();
        }
    })



  }

  userLogin() : void{

    //console.log(this.userName);
    //console.log(this.password);

    // @ts-ignore
    this.loginService.userLogin(this.userName,this.password).subscribe(data =>{

       this.apiResponse = data;

       if(this.userName == null){
         this.validUser = true;
         this.validationMessage = "Enter Valid Username ";
         console.log("Enter Username");

         setTimeout(()=>{                           //<<<---using ()=> syntax
           this.validUser = false;
         }, 2000);

       }else if(this.password == null){
         this.validUser = true;
         this.validationMessage = "Enter Valid Password ";
         console.log("Enter Password");

         setTimeout(()=>{                           //<<<---using ()=> syntax
           this.validUser = false;
         }, 2000);

       }else{

         //console.log(this.apiResponse);
         if(this.apiResponse.userFoundStatus == 'false') {
           this.validUser = true;
           this.validationMessage = "Username or password Invalid";
           console.log("Username or password Invalid !");

           setTimeout(() => {                           //<<<---using ()=> syntax
             this.validUser = false;
           }, 2000);

         }else if(this.apiResponse.userType == 'User') {
           this.validUser = true;
           this.validationMessage = "We're sorry but you are not authorized to access this website";
           setTimeout(() => {                           //<<<---using ()=> syntax
             this.validUser = false;
           }, 2000);

         }else if(this.apiResponse.activestatus == 0){
           this.validUser = true;
           this.validationMessage = "Your account is not activated please contact your admin";
           setTimeout(() => {                           //<<<---using ()=> syntax
             this.validUser = false;
           }, 2000);
         }else{
           this.validUser = false;
           localStorage.setItem('token', this.apiResponse.accessToken);
           localStorage.setItem('refreshToken', this.apiResponse.refreshToken);
           localStorage.setItem('expiredTime', this.apiResponse.expiredTime);
           localStorage.setItem('username',this.userName);
            this.reloadLogin();

         }

       }

    }, error => {
          console.log('Server not Connected !');
    });

   }

  reloadLogin() {
    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/adminPannel';
  }

  forgetPasswordPage() {
    this.router.navigate(['/forgetPassword'])
    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/forgetPassword';
  }

}
