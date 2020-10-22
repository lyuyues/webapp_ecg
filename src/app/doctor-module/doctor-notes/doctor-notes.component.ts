import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { DoctorService } from '../../shared/services/doctor.service';
import { Methods } from '../../shared/data/method-enum';
import { Comment } from'../../shared/data/comment';
import { CookieService } from 'angular2-cookie/core';
import { LoginService } from '../../shared/services/login.service';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-doctor-notes',
  templateUrl: './doctor-notes.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','../../patient-module/patient-notes/patient-notes.component.css','./doctor-notes.component.css']
})
export class DoctorNotesComponent implements OnInit {
  notes : any = [];
  session_id: string;
  userid: number;
  usercol: string;
  testTime: string;
  loadNoteData: boolean = true;
  comment: Comment = new Comment();
  patient_id;
  note_id;
  keyword: string;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private doctorService: DoctorService,
  private loginService:LoginService, public router:Router) { }

  ngOnInit() {
      this._cacheService.setGlobalPrefix("1.0.0");
      let  exists: boolean = this._cacheService.exists('doctor-notes');
      if(exists){
          
          this.loadNoteData = false;
          this.notes = this._cacheService.get('doctor-notes');
      }else{
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.doctorService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getnotes]).subscribe(data => {
                      this.loadNoteData = false;
                      this.notes = data.results;
                      this.notes.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
                      this._cacheService.set('doctor-notes', this.notes, {maxAge: 10 * 60});
           });  
      }  
  }
  updateHandler(value){
    this.keyword = value;
  }
  onSubmit(commentForm){
        if(commentForm.commentCentent==""){
            alert('please input comment content!')
        } else{
            this.comment.content = commentForm.commentCentent;
            this.comment.patient_id = this.patient_id;
            this.comment.note_id = this.note_id;
            this.doctorService.leaveComment(this.comment,this.session_id).subscribe(data => {
                    
                      if(data.result == "success"){
                        alert("Created comment successfully!");
                      }
            })
        }

  }
  parseTestid(time,userid,id){
      this.patient_id = userid;
      this.note_id = id;
      this.testTime = time;
  }
  testOnclick(test_id:string,record_id?:string){
    if(record_id){
        this.router.navigate(['/doctor/tests',test_id,record_id]);
    }else{
       this.router.navigate(['/doctor/tests',test_id, "null"]);
    }
    
  }
}
