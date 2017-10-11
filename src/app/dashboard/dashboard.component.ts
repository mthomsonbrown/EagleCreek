/**
 * @fileoverview The dashboard should be a high level overview for authenticated users.
 */

import { Component, OnInit } from '@angular/core';
import { DailyEntry } from './../daily-entry';
import { DailyEntryService } from './../daily-entry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DailyEntryService]
})
export class DashboardComponent implements OnInit {
  date = new Date();

  daily_entry: DailyEntry;

  constructor(private daily_entry_service: DailyEntryService) { }

  ngOnInit() {
    this.daily_entry_service.get_daily_entry()
    .subscribe(entry => { this.daily_entry = entry[0]; });
  }


  /**
   * onHi - Test function.  This should populate the div if the
   *    'Worked All Day' button was clicked.
   */
  onHi() {
    this.daily_entry.worked_all_day = true;
    this.daily_entry.flavor_text = 'You worked all day!';
  }
}
