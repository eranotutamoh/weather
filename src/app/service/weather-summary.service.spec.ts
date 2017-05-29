import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { WeatherSummaryService } from './weather-summary.service';

describe('MockBackend WeatherSummaryService Example', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      WeatherSummaryService,
    ]);
    this.WeatherSummaryService = this.injector.get(WeatherSummaryService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('getWeatherByCoords() should query current service url', () => {
    this.WeatherSummaryService.getWeatherByCoords({lat : 100, long : 200});
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toContain('http://api.openweathermap.org/data/2.5/weather?', 'url invalid');
    console.log('HEY MF', this.lastConnection.request.url);
  });

});
