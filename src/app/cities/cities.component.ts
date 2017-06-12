import { Component, EventEmitter, Output } from '@angular/core';
import {WeatherSummaryService} from '../service/weather-summary.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [WeatherSummaryService]
})
export class CitiesComponent {
  @Output() updatedWeather = new EventEmitter<Object>();
  weather: Object;
  errorMessage: string;
  showCities = false;
  cities = [{tz: 'America/New_York', iso: 'providence,us', name: 'Providence RI US'},
            {tz: 'Asia/Dubai', iso: 'dohar,qa', name: 'Dohar Qatar'},
            {tz: 'America/New_York', iso: 'iqaluit,ca', name: 'Iqaluit Nunavut'},
            {tz: 'Australia/Perth', iso: 'perth,au', name: 'Perth WA'}, {tz: 'Asia/Singapore', iso: 'singapore,sg', name: 'Singapore'},
            {iso: 'antarctica,aq', name: 'Antarctica'}, {tz: 'Europe/Madrid', iso: 'barcelona,es', name: 'Barcelona'}]

  constructor(private weatherSummaryService: WeatherSummaryService) { }

  toggleCities() {
    this.showCities = !this.showCities;
  }

  getWeather(iso, tz) {
    this.toggleCities();
    this.weatherSummaryService.getWeatherByCity(iso).subscribe(
        weather => {
          weather.tz = tz;
          this.weather = weather;
          this.updateWeather();
          return weather;
        },
        error => {
          console.log(<any>error);
          this.weather = {error: 'Problem accessing weather.'};
          this.updateWeather();
        }
    );
  }

  updateWeather(): void {
    this.updatedWeather.emit(this.weather);
  }

}
