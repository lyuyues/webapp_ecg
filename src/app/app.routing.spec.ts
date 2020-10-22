import { async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation }         from '@angular/common/testing';

// r - for relatively obscure router symbols
import * as r                         from  '@angular/router';
import { Router, RouterLinkWithHref } from '@angular/router';

import { By }                 from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';
import { Location }           from '@angular/common';
import { click }               from './router-stubs';
import { AppModule }              from './app.module';
import { AppComponent }           from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
let comp:     AppComponent;
let fixture:  ComponentFixture<AppComponent>;
let page:     Page;
let router:   Router;
let location: SpyLocation;
describe('AppComponent & RouterTestingModule', () => {
    beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, RouterTestingModule ]
    })
    .compileComponents();
  }));
  it('should navigate to "home" immediately', fakeAsync(() => {
    createComponent();
    expect(location.path()).toEqual('/home', 'after initialNavigation()');
    expectElementOf(HomeComponent);
  }));
  it('should navigate to "aboutus" on click', fakeAsync(() => {
    createComponent();
    click(page.aboutLinkDe);
    // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom

    advance();
    expectPathToBe('/aboutus');
    expectElementOf(AboutUsComponent);

    page.expectEvents([
      [r.NavigationStart, '/aboutus'], [r.RoutesRecognized, '/aboutus'],
      [r.NavigationEnd, '/aboutus']
    ]);
  }));

it('should navigate to "aboutus" w/ browser location URL change', fakeAsync(() => {
    createComponent();
    location.simulateHashChange('/aboutus');
    // location.go('/about'); // also works ... except in plunker
    advance();
    expectPathToBe('/aboutus');
    expectElementOf(AboutUsComponent);
  }));
})
////// Helpers /////////
function advance(): void {
  tick();
  fixture.detectChanges();
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location);
  router = injector.get(Router);
  router.initialNavigation();

  advance();

  page = new Page();
}
//Tame the madness with a Page class that simplifies access to component properties and encapsulates the logic that sets them.
class Page {
  aboutLinkDe:     DebugElement;
  homeLinkDe: DebugElement;
  contactLinkDe:    DebugElement;
  recordedEvents:  any[]  =  [];

  // for debugging
  comp: AppComponent;
  location: SpyLocation;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  expectEvents(pairs: any[]) {
    const events = this.recordedEvents;
    expect(events.length).toEqual(pairs.length, 'actual/expected events length mismatch');
    for (let i = 0; i < events.length; ++i) {
      expect((<any>events[i].constructor).name).toBe(pairs[i][0].name, 'unexpected event name');
      expect((<any>events[i]).url).toBe(pairs[i][1], 'unexpected event url');
    }
  }

  constructor() {
    router.events.subscribe(e => this.recordedEvents.push(e));
    // get all a tag
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.aboutLinkDe     = links[1];
    this.homeLinkDe = links[0];
    this.contactLinkDe    = links[2];
    // for debugging
    this.comp    = comp;
    this.fixture = fixture;
    this.router  = router;
  }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}