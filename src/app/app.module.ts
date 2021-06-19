import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';
import {TokenNavigationGuardGuard} from './token-navigation-guard.guard';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { AddUserComponent } from './add-user/add-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ManageUserProfileComponent } from './manage-user-profile/manage-user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { UserDataViewComponent } from './user-data-view/user-data-view.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPannelComponent,
    NavBarComponent,
    BottomNavigationComponent,
    FooterComponent,
    LogoutComponent,
    AddUserComponent,
    ManageUserProfileComponent,
    UserDataViewComponent,
    ForgetPasswordComponent,


  ],



  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,


  ],
  providers: [TokenNavigationGuardGuard,LogoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
