import { Component, EventEmitter, OnInit, OnChanges, Input, Output } from '@angular/core';
import {WeatherSummaryService} from '../service/weather-summary.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  providers: [WeatherSummaryService]
})
export class LocalComponent implements OnInit, OnChanges {
 @Input() localCoord: Object;
 @Output() updatedWeather = new EventEmitter<Object>();
 weather: Object;
 errorMessage: string;

  constructor(private weatherSummaryService: WeatherSummaryService) { }

  ngOnInit() {
  }

  ngOnChanges() {
      if (this.localCoord) {
          this.weatherSummaryService.getWeatherByCoords(this.localCoord).subscribe(
              weather => {
                  this.weather = weather;
                  this.updateWeather();
                  return weather;
              },
                      error => this.errorMessage = <any>error
            );
      }
  }

  updateWeather(): void {
      this.updatedWeather.emit(this.weather);
  }

}
