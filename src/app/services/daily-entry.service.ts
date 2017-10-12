/**
 * TODO: Move services to services folder?
 * Service to provide a [test] daily entry object.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DailyEntryService {

  private get_url = '/api/daily_entries';

  constructor(private http: HttpClient) {

  }

  /**
   * get_daily_entry - returns the output from a request to the /daily_entries
   * endpoint if the user has a stored token.
   *
   * @return {String}  The daily entry text.
   */
  get_daily_entry() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(
      this.get_url,
      {
        headers: new HttpHeaders().set('x-access-token', currentUser.token)
      });
  }
}
