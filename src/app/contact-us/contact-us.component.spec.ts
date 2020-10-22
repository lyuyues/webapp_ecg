import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';

import { ContactUsComponent }     from './contact-us.component';

import { AgmCoreModule } from 'angular2-google-maps/core';
let fixture: ComponentFixture<ContactUsComponent>;

describe('ContactUsComponent (highlightDirective)', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ ContactUsComponent],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(ContactUsComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should have skyblue <h2>', () => {
    const de = fixture.debugElement.query(By.css('google-map'));
    expect(de).toBeDefined();
  });
});