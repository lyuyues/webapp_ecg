import { async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { By }           from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Injectable } from '@angular/core';
import { RouterStub} from '../../router-stubs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { DataTableModule } from 'angular2-datatable';
import { SearchDoctorsPipe } from '../../shared/pipes/search-doctors.pipe';
import { PatientDoctorsComponent }  from './patient-doctors.component';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
import { SearchBoxComponent } from '../../search-box/search-box.component';
let comp: PatientDoctorsComponent;
let fixture: ComponentFixture<PatientDoctorsComponent>;                    
let page: Page;

@Injectable()
class FakePatientService{
    getInfo(usercol,userid,session_id){
        return Observable.from([{ "firstname":"grace", "lastname":"hui","userid":"1","gender":"female"}])
    }
    getData(usercol,userid,session_id,method){
        return Observable.from([{
  "result": "success",
  "total_results": 2,
  "results": [
    {
      "userid": "1241254",
      "firstname": "peter",
      "lastname": "pan",
      "hospital": "Jubliee Hospital",
      "connected_date": "2015-06-30",
      "patients": 35,
      "comments": 215,
      "username": "pan@jubliee.com",
      "phone": "604-445-6634",
      "viewed": true,
      "image": "90158019582.jpg"
    },
    {
      "userid": "1241254",
      "firstname": "imma",
      "lastname": "oliver",
      "hospital": null,
      "connected_date": null,
      "patients": 30,
      "comments": 45,
      "username": "pan@jubliee.com",
      "phone": "604-445-3634",
      "viewed": false,
      "image": "90158035582.jpg"
    }
  ]
}])
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
      imports:[DataTableModule],
      providers: [
          { provide: Router,      useClass: RouterStub},
          { provide: PatientService,      useClass: FakePatientService},
          { provide: LoginService,      useClass: FakeLoginService},
          { provide: CookieService,      useClass: FakeCookieService},
          { provide: CacheService,      useClass: CacheService},
      ],
      declarations:[PatientDoctorsComponent,SearchDoctorsPipe],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents()
    .then(createComponent);
  }));
  it('1st time, data does not exist ', () => {
   // expect(  comp.exists).toBeFalsy();
  });
  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should display profilr', () => {
    expect(page.profileRows.length).toBeGreaterThan(0);
  });
  it('1st tr should match username ', () => {
    const actualProfile = page.profileRows[0].textContent;
    expect(actualProfile).toContain('pan@jubliee.com', 'username');
  });
  it('After 1st time, data does exist ', () => {
    expect(  comp.exists).toBeTruthy();
  });
})
/////////// Helpers /////

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(PatientDoctorsComponent);
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
    this.profileRows    = fixture.debugElement.queryAll(By.css('.data-item')).map(de => de.nativeElement);
  };
}

////// Test Host Component //////
import { Component } from '@angular/core';

@Component({
  template: `
    <app-search-box    (update)="updateHandler($event)"></app-search-box>`
})
class TestSearchBoxComponent {
  keyword: string;
  updateHandler(event: any) { 
    this.keyword = event; 
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
    expect(testHost.keyword).toBe('host');
  });
});