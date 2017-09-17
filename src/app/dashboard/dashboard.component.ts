import { Component, OnInit } from '@angular/core';
import { DailyEntry } from './../daily-entry';
import { DailyEntryService } from './../daily-entry.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DailyEntryService]
})
export class DashboardComponent implements OnInit {
  date = new Date();

  daily_entry: DailyEntry;

  constructor(private _daily_entry_service: DailyEntryService) { }

  ngOnInit() {
    this._daily_entry_service.get_daily_entry()
      .subscribe(entry => { this.daily_entry = entry[0] });
  }

  onHi() {
    this.daily_entry.worked_all_day = true;
    this.daily_entry.flavor_text = "You worked all day!";
  }
}
