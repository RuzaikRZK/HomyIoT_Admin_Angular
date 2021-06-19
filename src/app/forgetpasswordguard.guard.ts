import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

import {SessionExpiry} from './session-expiry';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordguardGuard implements CanActivate {

  constructor(private sessionExpiredService:SessionExpiry, private router:Router) {
  }

  canActivate() :boolean {
    if(this.sessionExpiredService.forgetPasswordSession()){
      return true;
    }else{
      this.router.navigate(['/adminLogin']);
      return false;
    }
  }


}
