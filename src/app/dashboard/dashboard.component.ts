import { Component, OnInit } from '@angular/core';
import { DailyEntry } from './../daily-entry';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date = new Date();

  daily_entry: DailyEntry;

  constructor() { }

  ngOnInit() {
    this.daily_entry = {
      "_id": "Fake id",
      "worked_all_day": false,
      "flavor_text": "Not great..."
    }
  }

  onHi() {
    console.log("Clicked button!")
    this.daily_entry.worked_all_day = true;
    this.daily_entry.flavor_text = "You worked all day!"
  }
}
