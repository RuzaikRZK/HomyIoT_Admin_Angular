import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminPannelComponent} from './admin-pannel/admin-pannel.component';
import {TokenNavigationGuardGuard} from './token-navigation-guard.guard';
import {NavBarComponent} from './nav-bar/nav-bar.component'
import {AddUserComponent} from './add-user/add-user.component'
import {ManageUserProfileComponent} from './manage-user-profile/manage-user-profile.component'
import {UserDataViewComponent} from './user-data-view/user-data-view.component'
import {ForgetPasswordComponent} from './forget-password/forget-password.component'
import {ForgetpasswordguardGuard} from './forgetpasswordguard.guard'

const routes: Routes = [
  { path: '', redirectTo: '/adminLogin', pathMatch: 'full' },
  {path: 'userDataView', redirectTo: '/adminLogin', pathMatch: 'full'},
  {path: 'adminLogin', component: LoginComponent},
  {path: 'adminPannel', component: AdminPannelComponent, canActivate:[TokenNavigationGuardGuard]},
  {path: 'addUser', component: AddUserComponent, canActivate:[TokenNavigationGuardGuard]},
  {path: 'manageUserProfile', component: ManageUserProfileComponent, canActivate:[TokenNavigationGuardGuard]},
  {path: 'userDataView/:id', component:UserDataViewComponent,canActivate:[TokenNavigationGuardGuard]},
  {path: 'forgetPassword', component:ForgetPasswordComponent,canActivate: [ForgetpasswordguardGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
