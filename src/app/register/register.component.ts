/**
 * @fileoverview Displays a register view for the user and authenticates them
 * through the backend.  If the registration was successful, a token is saved to
 * localStorage.
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

import { User } from './../user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
  }


  ngOnInit() {
  }

  /**
   * onSubmit - Handles user submission on the frontend.
   *
   * @param  {User} model: User The user object as filled in from the view.
   */
  onSubmit(model: User) {
    this.http.post('/api/user', model)
      .subscribe(
        (result: JSON) => {
          localStorage.setItem(
            'currentUser', JSON.stringify({ token: result['token'] })
          );
          this.router.navigate(['dashboard']);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // Client Response
            console.log('An error occurred:', err.error.message);
          } else {
            // Backend Response
            console.log(`Backend threw error: ${err.error}`);
          }
        }
      );
  }
}
