import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSummaryComponent } from './weather-summary.component';

describe('WeatherSummaryComponent', () => {
  let component: WeatherSummaryComponent;
  let fixture: ComponentFixture<WeatherSummaryComponent>;
  const expectedWeather = {name: 'Ugoa', weather: [{icon: 'somepic'}], wind: {speed: 22.11122, deg: 125},
    main : {temp: 22, pressure: 1024, humidity: 66}, rain: {'3h': 1.7}, sys: {sunrise: 1496864511, sunset: 1496897888}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSummaryComponent);
    component = fixture.componentInstance;
    component.weatherSummary = expectedWeather;
    // fixture.detectChanges();
    component.formatWeather(component.weatherSummary);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialise locale name', () => {
    expect(component.locale).toEqual(expectedWeather.name);
  });
  it('should initialise condition icon name with full url', () => {
    expect(component.conditionIcon).toEqual(`http://openweathermap.org/img/w/${expectedWeather.weather[0].icon}.png`);
  });
  it('should initialise and format wind speed into kph rounded value', () => {
    expect(component.windSpeed).toEqual((expectedWeather.wind.speed *= 3.6).toPrecision(4));
  });
  it('should initialise wind direction to css transform value', () => {
    expect(component.windDirection).toEqual(`rotate(${expectedWeather.wind.deg + 90}deg)`);
  });
  it('should initialise pressure', () => {
    expect(component.pressure).toEqual(expectedWeather.main.pressure);
  });
  it('should initialise humidity', () => {
    expect(component.humidity).toEqual(expectedWeather.main.humidity);
  });
  it('should initialise temp', () => {
    expect(component.temp).toEqual(expectedWeather.main.temp);
  });
  it('should initialise rain', () => {
    expect(component.rain).toEqual(expectedWeather.rain['3h']);
  });
  it('should initialise sunrise to formatted time', () => {
    expect(component.sunrise).toEqual(new Date(expectedWeather.sys.sunrise * 1000).toLocaleTimeString());
  });
  it('should initialise sunset to formatted time', () => {
    expect(component.sunset).toEqual(new Date(expectedWeather.sys.sunset * 1000).toLocaleTimeString());
  });
});
