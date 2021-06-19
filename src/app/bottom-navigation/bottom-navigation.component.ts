import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.css']
})
export class BottomNavigationComponent implements OnInit {

  userName : string  | undefined;
  constructor() { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username') as string;

  }

}
