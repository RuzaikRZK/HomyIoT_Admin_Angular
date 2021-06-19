import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms'
import {MustMatch} from '../custom.passwordValidatorMatcher'
import {UserDataFilteringServiceService} from '../Services/user-data-filtering-service.service'
import {Routes, RouterModule, Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  error = false;


  constructor(private formBuilder: FormBuilder, private userDataFilteringServiceService:UserDataFilteringServiceService, private router:Router) { }

  ngOnInit(): void {
   // console.log(localStorage.getItem('resetPin'))

    this.registerForm = this.formBuilder.group({
      resetcode: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });



  }

  get f() { return this.registerForm.controls; }


  loginPage() {
    this.router.navigate(['/adminLogin'])
    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/adminLogin';
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if(localStorage.getItem('resetPin') == this.f.resetcode.value){

      const body = {
        "password": this.f.confirmPassword.value,
        "email": localStorage.getItem('userEmail'),
      };

      this.error = false;
      this.userDataFilteringServiceService.updatePassword(body).subscribe(data=>{
        console.log(data);

        if(data != null){
          localStorage.clear();
          this.loginPage();
        }
      })

    }else {
      this.error = true;
    }
  }

  }


