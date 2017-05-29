import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherSummaryService {

  private weatherByCoordsApi = 'http://api.openweathermap.org/data/2.5/weather?lat=-41&lon=174&appid=24a99ba5e26859506a20ade99664d3d3';

  constructor(private http: Http) { }

  getWeatherByCoords(coords: Object): Observable<any[]> {
    return this.http.get(`${this.weatherByCoordsApi}${coords}`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
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
