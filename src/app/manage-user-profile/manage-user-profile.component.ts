import { Component, OnInit } from '@angular/core';
import {UserDataFilteringServiceService} from '../Services/user-data-filtering-service.service'
import {timeout} from "rxjs/operators";
import {interval} from "rxjs";
import {Routes, RouterModule, Router, ActivatedRoute, Params} from '@angular/router';
import {LogoutComponent} from 'src/app/logout/logout.component'


interface Country {
  userId: number |undefined;
  userName: string |undefined;
  password: string |undefined;
  deviceId: string |undefined;
  email: string |undefined;
  contactNumber: string |undefined;
  activeStatus:number |undefined;
  userType:string |undefined;

  deviceStatusList : [{
    socket1_Status: number;
    socket2_Status: number;
    socket3_Status: number;
    socket4_Status: number;
    motionSensor_Status: number ;
    syncStatus: number ;
    lastSyncDate: string ;
    lastSyncTime: string ;
    id: number ;

  }]
}

const COUNTRIES: Country[] = [


];




@Component({
  selector: 'app-manage-user-profile',
  templateUrl: './manage-user-profile.component.html',
  styleUrls: ['./manage-user-profile.component.css']
})
export class ManageUserProfileComponent implements OnInit {

  deviceid:string ="";
  username:string ="";
  userType:string = "Select User Type";
  errorSttsus: boolean ;
  errorMessage: string;
  dataNotFoundEroor: boolean = false;


  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;
  countries: Country[];


  constructor(private userDataFilteringService:UserDataFilteringServiceService, private router:Router,private loogut:LogoutComponent, private activateRouter:ActivatedRoute) {

    this.refreshCountries();

  }

  ngOnInit(): void {
  }

  refreshCountries() {
    this.countries = COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  navigate(deviceid:string){

    localStorage.setItem("deviceId",deviceid);
    this.router.navigate(['/userDataView/'+deviceid], {relativeTo: this.activateRouter})


  }

  Logout(){
    this.loogut.logout();
  }

  searchUser(){

    if((this.username == null || this.username == "" ) && (this.deviceid == null || this.deviceid == "") && this.userType == "Select User Type") {
      this.errorSttsus = true;
      this.errorMessage = "Search criteria must be ◉ Username ◉ Device id  ◉ User type ◉ Username and User type ◉ Device id and User type"
      this.deviceid ="";
      this.username ="";

    }else if((this.username.length > 0 && this.username != "test2" ) && (this.deviceid.length > 0 && this.deviceid != "test2") && (this.username != "Select User Type")) {
      this.errorSttsus = true;
      this.errorMessage = "Error 2"
    }else if ((this.username.length > 0 ) && (this.deviceid.length > 0 )){
      this.errorSttsus = true;
      this.errorMessage = "Error 2"
    }else{
      this.errorSttsus = false;
      this.userDataFilteringService.advanceSearch(this.username,this.deviceid,this.userType).subscribe(data=>{
        //console.log(data)
        if(data.length == 0){
          this.dataNotFoundEroor= true;
        }else{
          this.dataNotFoundEroor= false;
        }
        this.countries =data
      }, error => {
          this.Logout();
      })

    }
  }

}
