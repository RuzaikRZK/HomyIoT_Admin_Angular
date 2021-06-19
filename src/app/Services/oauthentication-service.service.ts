import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccessToken} from '../AccessToken.model';
import { environment } from 'src/environments/environment';

const APIEndpoint = environment.APIEndpoint;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
  providedIn: 'root'
})
export class OAuthenticationServiceService {

  constructor(private http: HttpClient) { }

  public checkTokenValidation(acessToken:AccessToken){
    return this.http.post<boolean>(APIEndpoint+'HomyUser/checkAccessTokenValidation',acessToken);
  }


}
