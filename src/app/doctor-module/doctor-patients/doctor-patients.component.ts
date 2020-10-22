import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../shared/services/doctor.service';
import { Methods } from '../../shared/data/method-enum';
import { Comment } from'../../shared/data/comment';
import { CookieService } from 'angular2-cookie/core';
import { LoginService } from '../../shared/services/login.service';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','../../patient-module/patient-doctors/patient-doctors.component.css','./doctor-patients.component.css']
})
export class DoctorPatientsComponent implements OnInit {
  data: any =[];
  session_id: string;
  userid: number;
  usercol: string;
  comment: Comment = new Comment();
  patientName:string;
  loadPatients:boolean = true;
  keyword: string;
  patient_id;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private doctorService: DoctorService,
  private loginService:LoginService) { }

  ngOnInit() {
      this._cacheService.setGlobalPrefix("1.0.0");
      let  exists: boolean = this._cacheService.exists('patients');
      if(exists){
          
          this.loadPatients = false;
          this.data = this._cacheService.get('patients');
      }else{
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.doctorService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getpatients]).subscribe(data => {
                   
                    this.loadPatients = false;
                    this.data = data.results;
                    this._cacheService.set("patients",this.data,{maxAge: 10 * 60})
                    
          }); 
      }
  }
  updateHandler(value){
    this.keyword = value;
  }
  parseTestid(patientName,userid){
    this.patient_id = userid;
    this.patientName = patientName;
  }
  onSubmit(commentForm){
    if(commentForm.commentCentent==""){
            alert('please input comment content!')
    } else{
        this.comment.content = commentForm.commentCentent;
        this.comment.patient_id = this.patient_id;
        this.doctorService.leaveComment(this.comment,this.session_id).subscribe(data => {
            if(data.result=="success"){
            alert("Create comment successfully!");
          }
        })
    }

  }
}
