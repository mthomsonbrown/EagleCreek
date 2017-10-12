/**
 * @fileoverview Landing page for unauthenticated users.  Should present
 * general information about the application and options to sign up or sign in.
 */

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;
  constructor() {
    this.title = 'Eagle Creek';
  }

  ngOnInit() {
  }
}
