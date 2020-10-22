import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../shared/services/doctor.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  session_id: string;
  userid: number;
  usercol: string;
  result: any;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private doctorService: DoctorService,private loginService:LoginService) { }

  ngOnInit() {
      this._cacheService.setGlobalPrefix("1.0.0");
      let  exists: boolean = this._cacheService.exists('doctor-profile');
      if(exists){
         
          this.result = this._cacheService.get('doctor-profile');
      }else{
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.doctorService.getInfo(this.usercol, this.userid, this.session_id).subscribe(data => {
                    
                    this.result = data;
                    this._cacheService.set('doctor-profile', this.result, {maxAge: 10 * 60});
          });
      }
  }



}
