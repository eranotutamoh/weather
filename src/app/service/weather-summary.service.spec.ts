import { TestBed, inject } from '@angular/core/testing';
import { Http, ConnectionBackend } from '@angular/http';
import { WeatherSummaryService } from './weather-summary.service';

describe('WeatherSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherSummaryService, Http, ConnectionBackend]
    });
  });

  it('should ...', inject([WeatherSummaryService], (service: WeatherSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
