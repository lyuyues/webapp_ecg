import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../shared/services/doctor.service';
import { LoginService } from '../../shared/services/login.service';
import { Methods } from '../../shared/data/method-enum';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';

@Component({
  selector: 'app-doctor-new-patient',
  templateUrl: './doctor-new-patient.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','../../patient-module/patient-comments/patient-comments.component.css','./doctor-new-patient.component.css']
})
export class DoctorNewPatientComponent implements OnInit {
  data: any =[];
  session_id: string;
  userid: number;
  usercol: string;
  loadCommentData:boolean = false;
  constructor(private cookieService:CookieService,private doctorService: DoctorService,
  private _cacheService: CacheService,private loginSrvice:LoginService) { }

  ngOnInit() {
    let  exists: boolean = this._cacheService.exists('doctor-allpatient');
      if(exists){
          
          this.loadCommentData = false;
          this.data = this._cacheService.get('doctor-allpatient');
      }else{
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.doctorService.searchPatients(this.usercol, this.userid, this.session_id, '').subscribe(data => {
                         
                          this.loadCommentData = false;
                          this.data = data.results;
                          this._cacheService.set('doctor-allpatient', this.data, {maxAge: 10 * 60});
              });
      }
  }
  onReset(searchForm){
      searchForm.name =  "";
  }
  onSearch(serachform){
      
      this.loadCommentData = true;
      this.doctorService.searchPatients(this.usercol, this.userid, this.session_id, serachform.name).subscribe(data =>{
            
            this.data = data.results;
            this.loadCommentData = false;
      })
 }
 onClick(item){
  
 }
}
