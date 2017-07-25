import { Component, EventEmitter, OnInit, OnChanges, Input, Output } from '@angular/core';
import {WeatherSummaryService} from '../service/weather-summary.service';
import { MessagerService } from '../service/messager.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
})
export class LocalComponent implements OnInit, OnChanges {
 @Input() localCoord: Object;
 @Output() updatedWeather = new EventEmitter<Object>();
 weather: Object;
 errorMessage: string;

  constructor(private weatherSummaryService: WeatherSummaryService, private messagerService: MessagerService) { }

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
              error => {
                  console.error(<any>error);
                  this.messagerService.sendMessage('Cannot access weather information.');
              }
            );
      }
  }

  updateWeather(): void {
      this.updatedWeather.emit(this.weather);
  }

}
