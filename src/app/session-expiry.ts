import {Component, Injectable, OnInit} from '@angular/core';
import {BnNgIdleService} from 'bn-ng-idle';
import {interval, Observable, Subscription} from "rxjs";
import {OAuthenticationServiceService} from '../app/Services/oauthentication-service.service';
import {AccessToken} from './AccessToken.model';
import {formatNumber} from "@angular/common";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";


@Injectable({
  providedIn: 'root'
})

export class SessionExpiry implements OnInit {


  constructor(private bnIdle: BnNgIdleService, private OauthService: OAuthenticationServiceService, private AccessTokenDetailes: AccessToken) {
  }

  ngOnInit(): void {
  }

  SessionExpireConfig() {


     var tokenExpiredSeoonds : string = localStorage.getItem('expiredTime') as string;
     var tokenExpireTimeToNumber : any = tokenExpiredSeoonds;

     console.log(tokenExpireTimeToNumber);


    this.bnIdle.startWatching(800).subscribe((res) => {
      if (res) {
        console.log("Session Expired !");
        localStorage.clear();
        window.setInterval('refresh()', 10000);
        window.location.reload();
      }
    });
  }

  LoggedInGuard() {
    this.CheckTokenActication();
    this.SessionExpireConfig();
    return !!localStorage.getItem('token');
  }

  forgetPasswordSession(){
    return !!localStorage.getItem('resetPin');
  }

  CheckTokenActication() {
    acessTokenDetailes: new AccessToken();
    this.AccessTokenDetailes.access_token = localStorage.getItem('token');

      this.OauthService.checkTokenValidation(this.AccessTokenDetailes).subscribe(data => {

            if (data == false) {
              console.log("Token Expired");
              localStorage.clear();
              window.setInterval('refresh()', 10000);
              window.location.reload();
            }
      });
  }


}
