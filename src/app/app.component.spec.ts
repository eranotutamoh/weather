import { TestBed, async , fakeAsync, tick, ComponentFixture} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LocalComponent } from './local/local.component';
import {LocalService} from './service/local.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let spy: jasmine.Spy;
  let de: DebugElement;
  let el: HTMLElement;
  let localService: LocalService;

  const testLocale = 'Fiji';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LocalComponent
      ],
      providers:    [ LocalService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    localService = fixture.debugElement.injector.get(LocalService);
    spy = spyOn(localService, 'getLocale').and.returnValue(Promise.resolve(testLocale));
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
  });


  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent).toContain('Weather', 'H1 displays title');
  });

  it('should not show location data before OnInit', () => {
    expect(el.textContent).toBe('', 'no location displayed');
    expect(spy.calls.any()).toBe(false, 'getLocale not yet called');
  });

  it('should still not show location after component initialized', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain('Loading local data', 'no location yet');
    expect(spy.calls.any()).toBe(true, 'getLocale called');
  });

  it('should show locale after getLocale promise (async)', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async
      fixture.detectChanges();  // update view
      console.log('fiji!', el.textContent);
      expect(el.textContent).toBe(testLocale);
    });
  }));

  it('should show locale after getLocale promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(el.textContent).toBe(testLocale);
  }));

  it('should show locale after getLocale promise (jasmine.done)', (done: any) => {
    fixture.detectChanges();
    // get the spy promise and wait for it to resolve
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges(); // update view with getLocale
      expect(el.textContent).toBe(testLocale);
      done();
    });
  });

});
