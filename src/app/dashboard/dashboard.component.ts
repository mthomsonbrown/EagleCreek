import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

  onHi() {
    console.log("Clicked button!")
  }

}