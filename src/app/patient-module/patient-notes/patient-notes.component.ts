import { Component, OnInit, Input } from '@angular/core';
import { Router }      from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { Methods } from '../../shared/data/method-enum';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-patient-notes',
  templateUrl: './patient-notes.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-notes.component.css']
})
export class PatientNotesComponent implements OnInit {
  keyword: string;
  notes: any = [];
  session_id: string;
  userid: number;
  usercol: string;
  loadNoteData: boolean = true;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,private patientService: PatientService,
  private loginService: LoginService,public router:Router) { }

  ngOnInit() {
      this._cacheService.setGlobalPrefix("1.0.0");
      let  exists: boolean = this._cacheService.exists('notes');
    //   console.log("patient notes exists: "+exists);
      if(exists){
        //   console.log("getting patient notes from cache....");
          this.notes = this._cacheService.get('notes');
          this.loadNoteData = false;
      }else{
        //   console.log("getting patient notes from server....");
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.patientService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getnotes]).subscribe(data => {
                  this.notes = data.results;
                  this.notes.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
                  this.loadNoteData = false;
                  this._cacheService.set('notes', this.notes, {maxAge: 10 * 60});
         });   
     } 
  }
  updateHandler(value){
      this.keyword = value;
  }
  testOnclick(test_id:string,record_id?:string):void{
      if(record_id){
          this.router.navigate(['/patient/tests',test_id,record_id]);
      }else{
        this.router.navigate(['/patient/tests',test_id,"null"]);
      }
  }
}
