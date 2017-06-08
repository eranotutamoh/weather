import { TestBed, async , ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {LocalService} from './service/local.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let spy: jasmine.Spy;
  let localService: LocalService;
  const testLocale = {'latitude' : 100 , 'longitude' : 200 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [ LocalService ]
    })
    .overrideComponent(AppComponent, {
      set: {
        template: `<h1>{{title}}</h1>`
      }
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    localService = fixture.debugElement.injector.get(LocalService);
    spy = spyOn(localService, 'getLocale').and.returnValue(Promise.resolve(testLocale))
    fixture.detectChanges();
  });


  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
