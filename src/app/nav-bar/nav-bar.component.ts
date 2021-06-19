import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addUser(): void {

    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/addUser';

  }

  manageUser(): void {

    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/manageUserProfile';

  }

  dashboard(): void {
    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/adminPannel';
  }

}
