import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import { SfError } from '../models/sf-error.model';

@Injectable()
export class ApiService {
  // use the json folder as API URL
  API_URL = '/assets/json';
  TIMEOUT_PERIOD: number = 10 * 60 * 1000;

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  constructor(protected http: Http) { }

  get(path: string): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, { headers: this.headers })
      .timeout(this.TIMEOUT_PERIOD)
      .catch(this.handleError)
      .map(this.getJson);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
      `${this.API_URL}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
      .timeout(this.TIMEOUT_PERIOD)
      .catch(this.handleError)
      .map(this.getJson);
  }

  put(path: string, body): Observable<any> {
    return this.http.put(
      `${this.API_URL}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
      .timeout(this.TIMEOUT_PERIOD)
      .catch(this.handleError)
      .map(this.getJson);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${this.API_URL}${path}`,
      { headers: this.headers }
    )
      .timeout(this.TIMEOUT_PERIOD)
      .catch(this.handleError)
      .map(this.getJson);
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

  private getJson(response: Response) {
    try {
      return response.json();
    } catch (err) {
      return response.text();
    }
  }

  private handleError(error: Response | any) {
    let errObj: SfError = new SfError();
    if (error instanceof Response) {
      const body = error.text();
      try {
        errObj = error.json();
      } catch (e) {
        console.error('Invalid Error Response');
      }
      // keep the http status code
      errObj.httpRespCode = error.status;
    } else {
      errObj.msg = error.message ? error.message : error.toString();
    }
    if (!errObj.msg) {
      errObj.msg = `${error.status}`;
    }
    console.error(`ERROR FROM API: ${errObj.code} - ${errObj.msg}`);
    return Observable.throw(errObj);
  }

}
