import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date = new Date();
  worked_all_day;
  worked_text;
  constructor() {
    this.worked_all_day = false;
    this.worked_text = "You haven't worked!"
  }

  ngOnInit() {
  }

  onHi() {
    console.log("Clicked button!")
    this.worked_all_day = true;
    this.worked_text = "You worked all day!"
  }

}
