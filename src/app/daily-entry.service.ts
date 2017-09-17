import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DailyEntryService {

  private _get_url = "/api/daily_entries";

  constructor(private _http: Http) {

  }

  get_daily_entry() {
    return this._http.get(this._get_url)
      .map((response: Response) => response.json());
  }

}
