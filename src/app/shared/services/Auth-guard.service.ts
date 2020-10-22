import { Injectable } from '@angular/core';
import { CanActivate, Router,  } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private cookieService:CookieService, private router: Router) { }
  canActivate() {
    if (this.cookieService.get('user_info')) {
      let usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
      if(usercol == "doctor")
      return true;
    }
    //Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}