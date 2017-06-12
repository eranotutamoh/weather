import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {WeatherSummaryService} from '../service/weather-summary.service';
import { Observable } from 'rxjs/';
import { CitiesComponent } from './cities.component';

class WeatherSummaryServiceSpy {
  testWeather = {Forecast: 'Rain'};
  getWeatherByCoords = jasmine.createSpy('getWeatherByCoords').and.callFake(
      () => Observable.of(this.testWeather)
  );
}


describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesComponent ],
    })
    .overrideComponent(CitiesComponent, {
      set: {
        providers: [
          { provide: WeatherSummaryService, useClass: WeatherSummaryServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
