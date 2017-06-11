import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherSummaryService {

  //  private baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
  private baseUrl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather';
  private appId = '24a99ba5e26859506a20ade99664d3d3';
  private   formats = '&units=metric';

  constructor(private http: Http) { }

  getWeatherByCoords(coords: Object) {
    return this.http.get(`${this.baseUrl}?appid=${this.appId}&lat=${coords['lat']}&lon=${coords['long']}${this.formats}`)
       .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
