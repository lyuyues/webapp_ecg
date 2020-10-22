import { Component, OnInit } from '@angular/core';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  session_id: string;
  userid: number;
  usercol: string;
  result: any;
  exists: boolean;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private patientService: PatientService,private loginService: LoginService) { }

  ngOnInit() {
    this._cacheService.setGlobalPrefix("1.0.0");
         this.exists = this._cacheService.exists('profile');
      if(this.exists){
          this.result = this._cacheService.get('profile');
      }else{
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.patientService.getInfo(this.usercol, this.userid, this.session_id).subscribe(data => {
             
                  this.result = data;
                  this._cacheService.set('profile', this.result, {maxAge: 10 * 60});
          });
     }
  }

}
