import { Component, EventEmitter, Output } from '@angular/core';
import {WeatherSummaryService} from '../service/weather-summary.service';
import { MessagerService } from '../service/messager.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent  {
  @Output() updatedWeather = new EventEmitter<Object>();
  weather: Object;
  showCities = false;
  cities = [{tz: 'America/New_York', iso: 'providence,us', name: 'Providence RI US'},
            {tz: 'Asia/Dubai', iso: 'dohar,qa', name: 'Dohar Qatar'},
            {tz: 'America/New_York', iso: 'iqaluit,ca', name: 'Iqaluit Nunavut'},
            {tz: 'Australia/Perth', iso: 'perth,au', name: 'Perth WA'}, {tz: 'Asia/Singapore', iso: 'singapore,sg', name: 'Singapore'},
            {iso: 'antarctica,aq', name: 'Antarctica'}, {tz: 'Europe/Madrid', iso: 'barcelona,es', name: 'Barcelona'}];

  constructor(private weatherSummaryService: WeatherSummaryService, private messagerService: MessagerService) { }

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
          this.messagerService.sendMessage('Cannot access weather information.');
        }
    );
  }

  updateWeather(): void {
    this.updatedWeather.emit(this.weather);
  }

}
