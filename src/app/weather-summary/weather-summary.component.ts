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
  windSpeed: String;
  windDirection: String;
  pressure: Number;
  humidity: Number;
  temp: Number;
  rain: Number;
  sunrise: String;
  sunset: String;

  constructor() { }

  ngOnInit() {
    this.apiData = false;
  }

  ngOnChanges() {
    if (this.weatherSummary) { this.formatWeather(this.weatherSummary); }
  }

  formatWeather(weather) {
    if (!weather.error) {
      this.locale = weather.name;
      this.conditionIcon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
      this.windSpeed = this.formatWindSpeed(weather.wind.speed);
      this.windDirection = this.formatWindDirection(weather.wind.deg);
      this.pressure = weather.main.pressure;
      this.humidity = weather.main.humidity;
      this.temp = weather.main.temp;
      this.rain = ('rain' in weather) ? weather.rain['3h'] : null;
      this.sunrise = this.formatTime(weather.sys.sunrise, weather.tz);
      this.sunset = this.formatTime(weather.sys.sunset, weather.tz);
      this.apiData = true;
    }
  }

  formatWindSpeed(speed) {
     // convert m/s to kph
    return  (speed *= 3.6).toPrecision(4);
  }

  formatWindDirection(direction) {
    return  `rotate(${direction + 90}deg)`;
  }

  formatTime(time, tz= 'Pacific/Auckland') {
    return new Date(time * 1000).toLocaleTimeString('en-NZ', {timeZone: tz});
  }
}
