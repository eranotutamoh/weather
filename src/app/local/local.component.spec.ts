import { async, ComponentFixture, TestBed,  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocalComponent } from './local.component';

describe('LocalComponent', () => {
  let component: LocalComponent;
  let fixture: ComponentFixture<LocalComponent>;
  let expectedLocale: String;
  let localeEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localeEl  = fixture.debugElement.query(By.css('p'));
    expectedLocale = 'Havana';
    component.localCoord = expectedLocale;
    fixture.detectChanges();
  });

  it('should create LOCAL! component', () => {
    expect(component).toBeTruthy();
  });


});
