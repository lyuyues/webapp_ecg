import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { LoginService } from './shared/services/login.service'
import { DebugElement,Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { Component, NO_ERRORS_SCHEMA,Injectable }          from '@angular/core';
import { AppComponent }              from './app.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLinkStubDirective, RouterOutletStubComponent }   from './router-stubs';
import { AppModule }    from './app.module';
import { AppRoutingModule } from './app.routing';
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
        // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(true);
    }
}
@Component({selector: 'app-navigation', template: '<div></div>'})
class AppNavigationStubComponent {
  @Input('logined')logined:boolean;
}

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
    beforeEach( async(() => {
        TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            FooterComponent, AppNavigationStubComponent,
            RouterLinkStubDirective, RouterOutletStubComponent
        ],
        providers:[{ provide: LoginService,      useClass: FakeLoginService},]
        })
        .compileComponents()
        .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;
        });
    }));
    tests();
});
//////// Testing w/ NO_ERRORS_SCHEMA //////
//Add NO_ERRORS_SCHEMA to the testing module's schemas metadata to tell the compiler to ignore unrecognized elements and attributes. 
//You no longer have to declare irrelevant components and directives.

//These tests are shallow because they only "go deep" into the components you want to test.
//The only declarations are the component-under-test (AppComponent)
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, RouterLinkStubDirective ],
      providers:[{ provide: LoginService,      useClass: FakeLoginService},],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })

    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));
  tests();
});
// Testing real root module //
// Tricky because we are disabling the router and its configuration
// Better to use RouterTestingModule
describe('AppComponent & AppModule', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    // Get rid of app's Router configuration otherwise many failures.
    // Doing so removes Router declarations; add the Router stubs
    .overrideModule(AppModule, {
      remove: {
        imports: [ AppRoutingModule ]
      },
      add: {
        declarations: [ RouterLinkStubDirective, RouterOutletStubComponent ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
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
  });

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });
}

