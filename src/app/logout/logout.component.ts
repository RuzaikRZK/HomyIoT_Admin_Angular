import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {

    localStorage.clear();
    window.location.href = 'http://' + window.location.hostname + ':' + window.location.port + '/adminLogin';
    window.setInterval('refresh()', 10000);
    window.location.reload();

  }

}
