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
 @Output() slobbed = new EventEmitter<String>();
 weather: Object;
 errorMessage: string;

  constructor(private weatherSummaryService: WeatherSummaryService) { }

  ngOnInit() {
  }

  ngOnChanges() {
      if (this.localCoord) { // get details from api
         /* this.weatherSummaryService.getWeatherByCoords(this.localCoord).subscribe(
              weather => this.weather = weather,
              error =>  this.errorMessage = <any>error);*/
           }
  }
  slob(): void {
      console.log('SLOB', this.localCoord);
      this.slobbed.emit('SLOB said hello');
  }

}
