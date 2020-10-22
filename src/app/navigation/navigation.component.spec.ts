//It demonstrates how to find a RouterLink element, click it, and inspect a result, 
//without engaging the full router machinery. 
//Stubbed RouterLink tests can confirm that a component with links and an outlet is setup properly,
//that the component has the links it should have, and that they are all pointing in the expected direction. 
//These tests do not concern whether the app will succeed in navigating to the target component when the user clicks a link.
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA,Injectable,Component,DebugElement,ViewChild}    from '@angular/core';
import { NavigationComponent }       from './navigation.component';
import { RouterLinkStubDirective }   from '../router-stubs';
import { AppModule }    from '../app.module';
import { AppRoutingModule } from '../app.routing';
import { LoginService } from '../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
@Injectable()
class FakeCookieService{
    public get(str):string{
        let json = { "userid":"1", "usercol":"patient"};
        return JSON.stringify(json);
    }
}
@Injectable()
class FakeLoginService{
    public isLoggedIn: boolean = false;
    public loggedInUser :string;
    public redirectUrl: string;
    private  session_id: string = "123xyz";
    public  setSessionId(sid: string): void {
        this.session_id = sid;
    }
    public  getSessionId(): string {
        return this.session_id;
    }
    public clearSessionId(): void {
        this.session_id = null;
    }
}

let comp:    NavigationComponent;
let fixture: ComponentFixture<NavigationComponent>;

describe('NavigationComponent & TestModule', () => {
    beforeEach( async(() => {
        TestBed.configureTestingModule({
        declarations: [
            NavigationComponent,
            RouterLinkStubDirective
        ],
        providers:[
            { provide: LoginService,      useClass: FakeLoginService},
            { provide: CookieService,      useClass: FakeCookieService},
        ]
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(NavigationComponent);
            comp    = fixture.componentInstance;
            // pretend that it was wired to something that supplied a hero
            comp.logined = false;
        });
    }));
    tests();
});

function tests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    // trigger initial data binding
    fixture.detectChanges();
    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    // get the attached link directive instances using the DebugElement injectors
    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });
  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(5, 'should have 5 links');
    expect(links[0].linkParams).toBe('/home', '1st link should go to Home');
    expect(links[3].linkParams).toBe('/login', 'fourth link should go to login');
  });
  it('can click login link in template', () => {
    const loginLinkDe = linkDes[3];
    const loginLink = links[3];
    expect(loginLink.navigatedTo).toBeNull('link should not have navigated yet');
    loginLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(loginLink.navigatedTo).toBe('/login');
  });
}
////// Test Host Component //////

@Component({
  template: `
    <app-navigation    [logined]="loginedHost"></app-navigation>`
})
class TestNavigationComponentHost {
  loginedHost: boolean = false;
   @ViewChild(NavigationComponent) /* using viewChild we get access to the TestComponent which is a child of TestHostComponent */
   public testComponent: any;
}
//////////////////

describe('NavigationComponent when inside a test host', () => {
  let testHost: TestNavigationComponentHost;
  let fixture: ComponentFixture<TestNavigationComponentHost>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent, TestNavigationComponentHost ], // declare both
      providers:[
            { provide: LoginService,      useClass: FakeLoginService},
            { provide: CookieService,      useClass: FakeCookieService},
        ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture  = TestBed.createComponent(TestNavigationComponentHost);
    testHost = fixture.componentInstance;
    fixture.detectChanges(); // trigger initial data binding
  });

    it('should call ngOnChanges', ()=> {
        testHost.loginedHost = true;
        let spy = spyOn(testHost.testComponent, 'ngOnChanges');
        spy.and.callThrough();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeTruthy();
    })
});