import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router }      from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { BaseService } from '../shared/services/base.service';
import { PatientService } from '../shared/services/patient.service';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css','./patient.component.css']
})
export class PatientComponent implements OnInit {
  session_id: string;
  userid: number;
  usercol: string;
  result: any;
  patient: boolean;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,private loginService: LoginService,
  private patientService: PatientService, public router: Router) { }
  ngOnInit() {
      this._cacheService.setGlobalPrefix("1.0.0");
      this.session_id = this.cookieService.get('sessionId');
      this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
      this.patient = this.usercol == 'patient'? true:false;
      this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
      let  exists: boolean = this._cacheService.exists('profile');
      if(exists){
         
          this.result = this._cacheService.get('profile');
      }else{
          this.patientService.getInfo(this.usercol, this.userid, this.session_id).subscribe(data => {
                  this.result = data;
                  localStorage.setItem("username",this.result.firstname+this.result.lastname);
                  this._cacheService.set('profile', this.result, {maxAge: 10 * 60});
          });
      }
  }
  logout(){
    this.loginService.logout(this.patient).subscribe(data =>{
        if(data.result == "success"){
              localStorage.setItem("username", null);
              this.cookieService.remove("user_info");
              this._cacheService.removeAll();
        }
        this.router.navigate(['./home']);
    })
  }

}
