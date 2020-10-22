import { async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpyLocation }         from '@angular/common/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { Location }           from '@angular/common';
import { RouterStub,click} from '../../router-stubs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { DataTableModule } from 'angular2-datatable';
import { SearchDoctorsPipe } from '../../shared/pipes/search-doctors.pipe';
import { PatientCommentsComponent }  from './patient-comments.component';
import { PatientService } from '../../shared/services/patient.service';
import { SearchService } from '../../shared/services/search.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
import { SearchBoxComponent } from '../../search-box/search-box.component';
let comp: PatientCommentsComponent;
let fixture: ComponentFixture<PatientCommentsComponent>;                    
let page: Page;
let location: SpyLocation;

@Injectable()
class FakePatientService{
    getData(usercol,userid,session_id,method){
        // return Observable.from([
        //     {
        //         "result": "success",
        //         "page": 1,
        //         "total_results": 2,
        //         "results": [
        //             {
        //             "id": "531532",
        //             "userid": "1241254",
        //             "firstname": "peter",
        //             "lastname": "pan",
        //             "content": "Interested students should apply ASAP for these positions. PMC-Sierra reviews applications submitted to their website as they come in - t",
        //             "for_record": {
        //                 "id": "12512521",
        //                 "created": "2015-05-04 12:00:15",
        //                 "test_id": "79"
                        
        //             },
        //             "for_note": null,
        //             "created": "2015-06-30 22:00:04",
        //             "viewed": true
        //             }
        //         ]
        //     }
        // ])
        return new Observable(observer =>{
          observer.next(
             {
                "result": "success",
                "page": 1,
                "total_results": 2,
                "results": [
                    {
                    "id": "531532",
                    "userid": "1241254",
                    "firstname": "peter",
                    "lastname": "pan",
                    "content": "Interested students should apply ASAP for these positions. PMC-Sierra reviews applications submitted to their website as they come in - t",
                    "for_record": {
                        "id": "12512521",
                        "created": "2015-05-04 12:00:15",
                        "test_id": "79"
                        
                    },
                    "for_note": null,
                    "created": "2015-06-30 22:00:04",
                    "viewed": true
                    }
                ]
            }
          );
          observer.complete();
        })
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
@Injectable()
class FakeSearchService{
}
/// tests///
describe('PatientCommentsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCommentsComponent ],
      schemas:      [NO_ERRORS_SCHEMA]
    });
  });
  compileAndCreate();
  it('should NOT have comments before ngOnInit', () => {
    expect(comp.comments.length).toBe(0,
      'should not have comments before ngOnInit');
  });
 it('should display loader before ngOnInit', () => {
    expect(comp.loadCommentData).toBeTruthy();
  });
 it('should not display loader after ngOnInit', () => {
     fixture.detectChanges();
    expect(comp.loadCommentData).toBeFalsy();
  });

})
/** Add TestBed providers, compile, and create PatientCommentsComponent */
function compileAndCreate() {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:[DataTableModule, FormsModule,ReactiveFormsModule],
      providers: [
          { provide: Router,      useClass: RouterStub},
          { provide: PatientService,      useClass: FakePatientService},
          { provide: SearchService,      useClass: FakeSearchService},
          { provide: LoginService,      useClass: FakeLoginService},
          { provide: CookieService,      useClass: FakeCookieService},
          { provide: CacheService,      useClass: CacheService},
      ],
    })
    //WebPack developers need not call compileComponents because it inlines templates and css
    // as part of the automated build process that precedes running the test.
    // fixture = TestBed.createComponent(PatientCommentsComponent);
    // comp = fixture.componentInstance;
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(PatientCommentsComponent);
      comp = fixture.componentInstance;
    });
  }));
}
/////// Tests //////

describe('PatientCommentsComponent', () => {
  
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:[DataTableModule, FormsModule,ReactiveFormsModule,],
      providers: [
          { provide: Router,      useClass: RouterStub},
          { provide: PatientService,      useClass: FakePatientService},
          { provide: SearchService,      useClass: FakeSearchService},
          { provide: LoginService,      useClass: FakeLoginService},
          { provide: CookieService,      useClass: FakeCookieService},
          { provide: CacheService,      useClass: CacheService},
      ],
      declarations:[PatientCommentsComponent],
    })
    .compileComponents()// compile external templates and css
    .then(createComponent);
  }));
  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should display comments', () => {
    expect(page.profileRows.length).toBeGreaterThan(0);
  });
  it('1st tr should match username ', () => {
    let actualProfile = page.profileRows[0].textContent;
    expect(actualProfile).toContain('peter', 'firstname');
  });
  it('should reset form to null', () => {
      let formbutton:DebugElement = fixture.debugElement.query(By.css('#reset-button'))
      click(formbutton);
      let keywordInput:DebugElement = fixture.debugElement.query(By.css('#keyword'));
      let dateToInput:DebugElement = fixture.debugElement.query(By.css('#to'));
      expect(keywordInput.nativeElement.value).toBe('');
      expect(dateToInput.nativeElement.value).toBe('');
  })
  //Using fakeAsync all asynchronous processing will be paused until we call tick. 
  //This gives us greater control and avoids having to resort to nested blocks of Promises or Observables.
  //it can’t be used with XHR.
  it('should navigate to selected test detail on click', fakeAsync(() => {
    const li = page.profileRows[2];
   // li.dispatchEvent(new Event('click'));
    li.click()
    tick();

    // should have navigated
    console.log(page.navSpy.calls.count());
    expect(page.navSpy.calls.count()).toBe(1, 'navigate called first time')
    expect(page.navSpy.calls.any()).toBe(true, 'navigate called');

    // composed hero detail will be URL like 'heroes/42'
    // expect link array with the route path and hero id
    // first argument to router.navigate is link array
    const navArgs = page.navSpy.calls.first().args[0];
     expect(navArgs[0]).toContain('patient/tests', 'nav to test detail URL');
     expect(navArgs[1]).toBe('79', 'expected test_id');
     expect(navArgs[2]).toBe('12512521', 'expected record_id')

  }));

})
/////////// Helpers /////

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(PatientCommentsComponent);
  comp = fixture.componentInstance;// to access properties and methods

  // change detection triggers ngOnInit which gets a profile data
  fixture.detectChanges();
  page = new Page();
//not sure if need to resolve Observable
//   return fixture.whenStable().then(() => {
//     // got the profiles and updated component
//     // change detection updates the view
//     fixture.detectChanges();
//     page = new Page();
//   });
}

class Page {
  /** Profile line elements */
  profileRows: HTMLLIElement[];

  /** Spy on router navigate method */
  navSpy: jasmine.Spy;
  
      
  constructor() {
    this.profileRows    = fixture.debugElement.queryAll(By.css('.data-item')).map(de => de.nativeElement);
    // Get the component's injected router and spy on it
    const router = fixture.debugElement.injector.get(Router);
    this.navSpy = spyOn(router, 'navigate');
};
}

