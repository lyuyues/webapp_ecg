import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';

import { AboutUsComponent }     from './about-us.component';

let fixture: ComponentFixture<AboutUsComponent>;

describe('ContactUsComponent (highlightDirective)', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ AboutUsComponent],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(AboutUsComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should have <h2>', () => {
    const de = fixture.debugElement.query(By.css('h2'));
    expect(de.nativeElement).toBeDefined();
  });
});
