import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.css']
})
export class WeatherSummaryComponent implements OnInit, OnChanges {
  @Input() weatherSummary: Object;
  locale: String;
  conditionIcon: String;
  apiData: boolean;
  wind: Object;
  pressure: Number;
  humidity: Number;
  temp: Number;
  sunrise: String;
  sunset: String;
  gold = 'lime';

  constructor() { }

  ngOnInit() {
    this.apiData = false;
  }

  ngOnChanges() {
    if (this.weatherSummary) { this.formatWeather(this.weatherSummary); }
  }

  formatWeather(weather) {
    console.log(weather);
    this.locale = weather.name;
    this.conditionIcon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    this.wind = {direction: weather.wind.deg, speed: this.formatWindSpeed(weather.wind.speed)}
    this.pressure = weather.main.pressure;
    this.humidity = weather.main.humidity;
    this.temp = weather.main.temp;
    this.sunrise = this.formatTime(weather.sys.sunrise);
    this.sunset = this.formatTime(weather.sys.sunset);
    this.apiData = true;
  }

  formatWindSpeed(speed) {
    return speed * 3.6; // convert m/s to kph
  }

  formatTime(time) {
    return new Date(time * 1000).toLocaleTimeString();
  }
}
