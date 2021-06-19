import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

const APIEndpoint = environment.APIEndpoint;

export class accessTokeDetails {
  constructor(public userFoundStatus: string,
              public accessToken: string,
              public expiredTime: string,
              public refreshToken: string,
              public userType: string,
              public activestatus: number) {
  }
}

@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {

  constructor(private httpClient: HttpClient) { }

  public userLogin(username:string ,password: string){
      return this.httpClient.get<accessTokeDetails>(APIEndpoint+'HomyUser/adminLogin/' + username + '/' + password);
  }

}
