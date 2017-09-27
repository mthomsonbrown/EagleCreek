import { Component, OnInit } from '@angular/core';
import { User } from './../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor() {
    this.user = new User();
    console.log('You\'er in the register component class!' + this.user);
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('You submitted user: ' + this.user.name);
  }

}
