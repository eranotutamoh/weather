import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocalComponent } from './local/local.component';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';
import { CitiesComponent } from './cities/cities.component';
import {WeatherSummaryService} from './service/weather-summary.service';

@NgModule({
  declarations: [
    AppComponent,
    LocalComponent,
    WeatherSummaryComponent,
    CitiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WeatherSummaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
