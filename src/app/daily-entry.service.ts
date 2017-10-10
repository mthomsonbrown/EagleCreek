import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DailyEntryService {

  private get_url = '/api/daily_entries';

  constructor(private http: HttpClient) {

  }

  get_daily_entry() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(
      this.get_url,
      {
        headers: new HttpHeaders().set('x-access-token', currentUser.token)
      });
  }
}
