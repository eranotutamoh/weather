import { async, ComponentFixture, TestBed,  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {WeatherSummaryService} from '../service/weather-summary.service';
import { MessagerService } from '../service/messager.service';
import {LocalService} from '../service/local.service';
import { LocalComponent } from './local.component';
import { Observable } from 'rxjs/';

class WeatherSummaryServiceSpy {
  testWeather = {Forecast: 'Rain'};
  getWeatherByCoords = jasmine.createSpy('getWeatherByCoords').and.callFake(
      () => Observable.of(this.testWeather)
  );
}

describe('LocalComponent ', () => {
  let component: LocalComponent;
  let fixture: ComponentFixture<LocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalComponent ],
      providers: [LocalService, MessagerService]
    })
    .overrideComponent(LocalComponent, {
            set: {
              providers: [
                { provide: WeatherSummaryService, useClass: WeatherSummaryServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalComponent);
    component = fixture.componentInstance;
    component.weather = {Rain: '70%', Temp: '20 C'};
  });

  it('should create local component', () => {
    expect(component).toBeTruthy();
  });

});

describe('LocalComponent when inside a test host', () => {
  let testHost: TestAppComponent;
  let hostFixture: ComponentFixture<TestAppComponent>;
  let localEl: DebugElement;
  const testCoords = {lat: '100' , long: '200'};

  beforeEach( async(() => {
    TestBed.overrideComponent(LocalComponent, {
      set: {
        template: '<p>{{localCoord.lat}}</p>',
        providers: [
          { provide: WeatherSummaryService, useClass: WeatherSummaryServiceSpy } , MessagerService
        ]
      }
    });
    TestBed.configureTestingModule({
      declarations: [ LocalComponent, TestAppComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture  = TestBed.createComponent(TestAppComponent);
    testHost = hostFixture.componentInstance;
    localEl   = hostFixture.debugElement.query(By.css('p'));
    hostFixture.detectChanges();
  });

  it('should pass input coordinates', () => {
    expect(localEl.nativeElement.textContent).toEqual(testCoords.lat);
  });

  it('should output weather to host app', () => {
    expect(testHost.theWeather).toEqual({Forecast: 'Rain'});
  });
});

////// Test App Component //////
import { Component } from '@angular/core';

@Component({
  template: `<app-local [localCoord]="localCoords" (updatedWeather)="updateWeather($event)"></app-local>`
})
class TestAppComponent {
  localCoords = {lat: 100 , long: 200};
  theWeather: Object;
  updateWeather(msg: Object) { this.theWeather = msg; }
}
