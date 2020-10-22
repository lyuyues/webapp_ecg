import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { PatientAuthGuardService } from './Auth-guard-patient.service';
import { CookieService } from 'angular2-cookie/core';
describe('AuthGuardService', () => {
  class StubCookieService {
  get: (key:string) => string;
 }
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [PatientAuthGuardService,
                    { provide:CookieService, useClass:StubCookieService}
        ],
        imports: [RouterTestingModule]
    });
  });
  it('user is valid',
    // inject your guard service AND Router
    async(inject([PatientAuthGuardService,CookieService, Router], (auth, cookieService,router) => {
      cookieService.get= jasmine.createSpy('get').and.returnValue('{"usercol":"patient"}');
      // add a spy
       spyOn(router, 'navigate');
       expect(auth.canActivate()).toBeTruthy();
       expect(cookieService.get).toHaveBeenCalledWith('user_info');
      //  expect(router.navigate).toHaveBeenCalled();
    }) 
  ));
  it('user is invalid',
    // inject your guard service AND Router
    async(inject([PatientAuthGuardService,CookieService, Router], (auth, cookieService,router) => {
      cookieService.get= jasmine.createSpy('get').and.returnValue('{"usercol":"doctor"}');
      // add a spy
       spyOn(router, 'navigate');
       expect(auth.canActivate()).toBeFalsy();
       expect(cookieService.get).toHaveBeenCalledWith('user_info');
       // return false. will nativegate to '/login'
       expect(router.navigate).toHaveBeenCalled();
       let navSpy: jasmine.Spy = router.navigate;
       expect(navSpy.calls.first().args[0][0]).toBe('/login')
    }) 
  ));
});
