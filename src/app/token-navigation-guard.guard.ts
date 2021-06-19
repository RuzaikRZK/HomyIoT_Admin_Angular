import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {SessionExpiry} from './session-expiry';


@Injectable({
  providedIn: 'root'
})
export class TokenNavigationGuardGuard implements CanActivate {

  constructor(private sessionExpiredService:SessionExpiry, private router:Router) {
  }

  canActivate() :boolean {
    if(this.sessionExpiredService.LoggedInGuard()){
      return true;
    }else{
      this.router.navigate(['/adminLogin']);
      return false;
    }
  }

}
