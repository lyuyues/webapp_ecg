import { Component, OnInit } from '@angular/core';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { Methods } from '../../shared/data/method-enum';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
import { SearchBoxComponent } from '../../search-box/search-box.component';
@Component({
  selector: 'app-patient-doctors',
  templateUrl: './patient-doctors.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-doctors.component.css']
})
export class PatientDoctorsComponent implements OnInit {
  data: any =[];
  session_id: string;
  userid: number;
  usercol: string;
  method: string;
  keyword: string;
  loadDoctors: boolean = true;
  exists:boolean;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private patientService: PatientService,private loginService: LoginService) { }

  ngOnInit() {
    this._cacheService.setGlobalPrefix("1.0.0");
      this.exists = this._cacheService.exists('doctors');
      // console.log("patient doctors exists: "+this.exists);
      if(this.exists){
        // console.log("getting patient doctors from cache....");
          this.data = this._cacheService.get('doctors');
          this.loadDoctors = false;
      }else{
        // console.log("getting patient doctors from server....");
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.patientService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getdoctors]).subscribe(data => {          
                  
                  this.data = data.results;
                  this.loadDoctors = false;
                  this._cacheService.set('doctors', this.data, {maxAge: 10 * 60});

           });  
      }  
  }
  updateHandler(value){
    this.keyword = value;
  }
}
