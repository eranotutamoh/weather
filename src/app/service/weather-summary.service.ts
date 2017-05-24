import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

@Injectable()
export class WeatherSummaryService {

  private weatherByCoordsApi = 'http://api.openweathermap.org/data/2.5/weather?lat=-41&lon=174&appid=24a99ba5e26859506a20ade99664d3d3';

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getWeatherByCoords(coords: Object): Promise<Object> {
    return this.http.get(`${this.weatherByCoordsApi}${coords}`)
          .toPromise()
          .then(response => JSON.parse(response['_body']) )
          .catch(this.handleError);
  }

}
