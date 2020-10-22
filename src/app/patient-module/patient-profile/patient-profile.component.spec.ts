import { async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { By }           from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { RouterStub} from '../../router-stubs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { PatientProfileComponent }  from './patient-profile.component';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
let comp: PatientProfileComponent;
let fixture: ComponentFixture<PatientProfileComponent>;                    
let page: Page;

@Injectable()
class FakePatientService{
    getInfo(usercol,userid,session_id){
        return Observable.from([{ "firstname":"grace", "lastname":"hui","userid":"1","gender":"female"}])
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
@Injectable()
class FakeCookieService{
    public get(str):string{
        let json = { "userid":"1", "usercol":"patient"};
        return JSON.stringify(json);
    }
}
/////// Tests //////

describe('PatientProfileComponent', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      providers: [
          { provide: Router,      useClass: RouterStub},
          { provide: PatientService,      useClass: FakePatientService},
          { provide: LoginService,      useClass: FakeLoginService},
          { provide: CookieService,      useClass: FakeCookieService},
          { provide: CacheService,      useClass: CacheService},
      ],
      declarations:[PatientProfileComponent]
    })
    .compileComponents()
    .then(createComponent);
  }));

  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should display profilr', () => {
    expect(page.profileRows.length).toBeGreaterThan(0);
  });
  it('1st tr should match id ', () => {
    const actualProfile = page.profileRows[0].textContent;
    expect(actualProfile).toContain('1', 'id');
  });
  it('1st not in cache ', () => {
  });
})
/////////// Helpers /////

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(PatientProfileComponent);
  comp = fixture.componentInstance;

  // change detection triggers ngOnInit which gets a profile data
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // got the profiles and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  /** Profile line elements */
  profileRows: HTMLLIElement[];

  /** Spy on router navigate method */
  navSpy: jasmine.Spy;

  constructor() {
    this.profileRows    = fixture.debugElement.queryAll(By.css('.text-success')).map(de => de.nativeElement);
  };
}