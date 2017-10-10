import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

import { User } from './../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit(model: User) {
    this.http.post('/api/authenticate', model)
      .subscribe(
        (result: JSON) => {
          if (result['success']) {
            console.log('Token is: ' + result['token']);
            localStorage.setItem(
              'currentUser', JSON.stringify({ token: result['token'] })
            );
            this.router.navigate(['dashboard']);
          } else {
            console.log(result['message']);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // Client Response
            console.log('An error occurred:', err.error.message);
          } else {
            // Backend Response
            console.log('Backend returned code ${err.status},' +
                        ' body was: ${err.error}');
          }
        }
      );
  }

}
