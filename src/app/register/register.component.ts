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
    console.log('You\'er in the register component class!' + this.user);
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('You submitted user: ' + this.user.name);
    this.http.post('/api/register', JSON.stringify(this.user))
      .subscribe(
        data => {
          console.log('From post, content is: ' + data);
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
