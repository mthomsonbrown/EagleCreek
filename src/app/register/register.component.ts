import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from './../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(private http: HttpClient) {
    this.user = new User();
    this.user.name = 'Test Name';
    console.log('You\'er in the register component class!' + this.user.name);
  }

  ngOnInit() {
  }

  onSubmit(model: User) {
    console.log('You submitted user: ' + model.name);
    console.log('You submitted user: ' + model.email);
    this.http.post('/api/user', model)
      .subscribe(
        (user: User) => {
          console.log('From post, User is: ' + model.name);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // Client Response
            console.log('An error occurred:', err.error.message);
          } else {
            // Backend Response
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        }
      );
  }
}
