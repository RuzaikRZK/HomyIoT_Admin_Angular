import {Component, Injectable, OnInit} from '@angular/core';
import {UserDataFilteringServiceService} from '../Services/user-data-filtering-service.service'
import {HttpResponse} from "@angular/common/http";
import {LogoutComponent} from '../logout/logout.component'
import {User} from 'src/app/user.model'
import index from "@angular/cli/lib/cli";




@Component({
  selector: 'app-admin-pannel',
  templateUrl: './admin-pannel.component.html',
  styleUrls: ['./admin-pannel.component.css']
})


export class AdminPannelComponent implements OnInit {


  totalUserCounts:number | undefined;
  activeUserCount: number | undefined;
  deactivateUserCount: number | undefined;
  connectedDeviceCount:number | undefined;
  disconnectedDeviceCount:number | undefined;
  togvalue:boolean | undefined;
  togOptionValue:string = 'All';
  activateTogg:string | undefined;
   userData: User[] | undefined;





  constructor(private userDataFiltering: UserDataFilteringServiceService, private logoutComponent:LogoutComponent) {

  }

  ngOnInit(): void {
    this.getActiveUserCount();
    this.getDeactivateUserCount();
    this.getDeviceSyncData();
  this.getUserData(4);
    this.togvalue = false;

  }



  getActiveUserCount(): void {
    this.userDataFiltering.getActiveUsers().subscribe(data => {
      this.activeUserCount = data['countActiveUsers'];
      this.totalUserCounts =data['countTotalUsers'];
    }, error => {
      this.Logout();
    });
  }

  getDeactivateUserCount(): void {

    this.userDataFiltering.getDeactiveUsers().subscribe(data =>{
        this.deactivateUserCount = data['count'];
    }, error => {
      this.Logout();
    })

  }

  getDeviceSyncData(): void {
    this.userDataFiltering.getDeviceSyncData().subscribe(data =>{
        this.connectedDeviceCount = data['connectedDeviceCount'];
        this.disconnectedDeviceCount = data['disconnectedDeviceCount'];
    }, error => {
      this.Logout();
    })
  }

  Logout(): void {
    this.logoutComponent.logout();
  }


  getUserData(size: number): void {

    this.userDataFiltering.getUserDataWithSize(size).subscribe(data => {
        this.userData=data;
        console.log(this.userData)
    },error => {
      this.Logout();
    })

  }

  changeUserDatatableToggel(): void{

    console.log(this.togOptionValue);
    var togval  = Number(this.togOptionValue);

    if(this.togOptionValue=='All'){
      this.getUserData(Number(this.totalUserCounts));
    }else{
      this.getUserData(togval);
    }

  }



  updateActivation(event: any, conditioning: number) : void {



    this.userDataFiltering.getActiveStatusbyId(event.target.value).subscribe(data =>{

      if(data['activationStatus']==1){
        this.userDataFiltering.updateAccountActivationStatus(event.target.value,0).subscribe(data);
      }else if (data['activationStatus']==0){
        this.userDataFiltering.updateAccountActivationStatus(event.target.value,1).subscribe(data);
      }
    },error => {
      this.Logout();
    })


  }





}
