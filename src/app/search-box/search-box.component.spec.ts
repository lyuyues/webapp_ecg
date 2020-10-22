import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchBoxComponent } from './search-box.component';
describe('SearchBoxComponent when tested directly', () => {
  let comp: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let heroEl: DebugElement;

  // async beforeEach
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ],
    })
    .compileComponents(); // compile template and css
  }));

    // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    comp    = fixture.componentInstance;
    heroEl  = fixture.debugElement.query(By.css('.form-control')); // find input element
    fixture.detectChanges(); // trigger initial data binding
  });
  it('should display  input', () => {
    expect(heroEl).toBeDefined();
  });
  it('should raise selected event when clicked', () => {
    comp.update.subscribe((value) => {
      expect(value).toBe('keyword')
    });
    comp.onInput('keyword')
  });
  it('should raise selected event when dispatchEvent input', () => {
    let inputValue: any;
    comp.update.subscribe((value) => inputValue = value);
    let input:HTMLInputElement  = heroEl.nativeElement;
    input.value="keyword";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputValue).toBe("keyword");
  });
})


////// Test Host Component //////
import { Component } from '@angular/core';

@Component({
  template: `
    <app-search-box    (update)="onUpdateed($event)"></app-search-box>`
})
class TestSearchBoxComponent {
  value: string;
  onUpdateed(event: any) { 
    this.value = event; 
  }
}

//////////////////

describe('TestSearchBoxComponent when inside a test host', () => {
  let testHost: TestSearchBoxComponent;
  let fixture: ComponentFixture<TestSearchBoxComponent>;
  let heroEl: DebugElement;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent, TestSearchBoxComponent ], // declare both
    }).compileComponents();
  }));

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture  = TestBed.createComponent(TestSearchBoxComponent);
    testHost = fixture.componentInstance;
    heroEl   = fixture.debugElement.query(By.css('.form-control')); // find hero
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display host input ', () => {
    expect(heroEl).toBeDefined();
  });
  it('should raise selected event when clicked', () => {

    let input:HTMLInputElement  = heroEl.nativeElement;
    input.value="host";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(testHost.value).toBe('host');
  });
});