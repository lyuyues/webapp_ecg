import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { DoctorService } from '../../shared/services/doctor.service';
import { LoginService } from '../../shared/services/login.service';
import { Methods } from '../../shared/data/method-enum';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','../../patient-module/patient-dashboard/patient-dashboard.component.css','./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  data: any =[];
  notes : any = [];
  session_id: string;
  userid: number;
  usercol: string;
  result: any;
  loadTestData: boolean = true;
  loadNoteData: boolean = true;
  constructor(private cookieService:CookieService,private doctorService: DoctorService, 
  private loginService:LoginService,public router: Router) { 
   
  }

  ngOnInit() {
      this.session_id = this.cookieService.get('sessionId');;
      this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
      this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;

      this.doctorService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.gettests]).subscribe(data => {
              this.loadTestData = false;
              this.data = data.results;
              this.data.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
              this.data = this.data.slice(0, 6);
     });
     this.doctorService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getnotes]).subscribe(data => {
              this.loadNoteData = false;
              this.notes = data.results;
              this.notes.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
              this.notes = this.notes.slice(0, 8);
    });
  }
  testOnclick(test_id:string,record_id?:string){
    if(record_id){
        this.router.navigate(['/doctor/tests',test_id,record_id]);
    }else{
       this.router.navigate(['/doctor/tests',test_id, "null"]);
    }
  }

}
