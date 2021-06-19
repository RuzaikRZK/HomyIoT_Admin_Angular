import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {UserData} from 'src/app/userSave.model'
import {User} from 'src/app/user.model'
import {ManageUserProfileComponent} from 'src/app/manage-user-profile/manage-user-profile.component'

const APIEndpoint = environment.APIEndpoint;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "bearer" + localStorage.getItem('token')
  })

};

@Injectable({
  providedIn: 'root'
})
export class UserDataFilteringServiceService {

  constructor(private httpClient: HttpClient) {
  }

  public getActiveUsers() {
    return this.httpClient.get<any>(APIEndpoint + 'HomyUser/countActiveUser', httpOptions);
  }

  public getDeactiveUsers() {
    return this.httpClient.get<any>(APIEndpoint + 'HomyUser/countDeactiveUser', httpOptions);
  }

  public getDeviceSyncData() {
    return this.httpClient.get<any>(APIEndpoint + 'HomyUser/countSyncUsers', httpOptions);
  }

  public getUserDataWithSize(size: number) {
    return this.httpClient.get<User[]>(APIEndpoint + 'HomyUser/getUser?size='+size, httpOptions);
  }

  public getActiveStatusbyId(userId: number){
    return this.httpClient.get<any>(APIEndpoint + 'HomyUser/getActivationStatusbyId/'+userId, httpOptions);
  }

  public updateAccountActivationStatus(userId:number, status:number){
    return  this.httpClient.post<any>(APIEndpoint + 'HomyUser/updateActivationStatus?userId='+userId+'&status='+status,null,httpOptions);
  }

  public getGeneratedDeviceId(){
    return this.httpClient.get<any>(APIEndpoint + 'HomyUser/getRandomDeviceId',httpOptions);
  }

  public saveUserData(body){
    return this.httpClient.post(APIEndpoint + 'HomyUser/setUser',body,httpOptions)
  }

  public advanceSearch(username,deviceId,userType){
    if(userType == "Select User Type"){
      userType = "";
    }
    return this.httpClient.get<User[]>(APIEndpoint+ 'HomyUser/advanceSearch?username='+username+'&deviceId='+deviceId+'&userType='+userType+'',httpOptions);
  }


  public findUserDatabyDeviceId(deviceId:string) {
    return this.httpClient.get<User>(APIEndpoint+ 'HomyUser/getUserByDeviceId/'+deviceId,httpOptions);
  }


  public updateUserData(userId:number,body){
    return this.httpClient.post(APIEndpoint + 'HomyUser/updateUser/'+userId,body,httpOptions);
  }

  public getResetCodeforForgetPassoword(body){
    return this.httpClient.post(APIEndpoint + 'HomyUser/getResetPinforForgetPassowrd',body,httpOptions);
  }

  public updatePassword(body){
    return this.httpClient.post(APIEndpoint + 'HomyUser/updatePassword',body);
  }





}
