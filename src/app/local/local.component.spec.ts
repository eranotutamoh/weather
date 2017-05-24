import { async, ComponentFixture, TestBed,  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocalComponent } from './local.component';

describe('LocalComponent ', () => {
  let component: LocalComponent;
  let fixture: ComponentFixture<LocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalComponent);
    component = fixture.componentInstance;
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
        template: '<p>{{localCoord.lat}}</p>'
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

  /*it('should raise selected event when clicked', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });*/
});




////// Test App Component //////
import { Component } from '@angular/core';

@Component({
  template: `<app-local [localCoord]="localCoords" (slobbed)="obeyOutput($event)"></app-local>`
})
class TestAppComponent {
  localCoords = {lat: 100 , long: 200};
  obeyOutput(msg: String) { console.log('OBEYED!!!!', msg); }
}
