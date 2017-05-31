import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocalComponent } from './local/local.component';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LocalComponent,
    WeatherSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
