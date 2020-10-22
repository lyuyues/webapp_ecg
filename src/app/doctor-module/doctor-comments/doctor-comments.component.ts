import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { DoctorService } from '../../shared/services/doctor.service';
import { LoginService } from '../../shared/services/login.service';
import { SearchService } from '../../shared/services/search.service';
import { Methods } from '../../shared/data/method-enum';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-doctor-comments',
  templateUrl: './doctor-comments.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','../../patient-module/patient-comments/patient-comments.component.css','./doctor-comments.component.css']
})
export class DoctorCommentsComponent implements OnInit {

  comments : any = [];
  session_id: string;
  userid: number;
  usercol: string;
  method: string;
  loadCommentData: boolean = true;
  resetData: any = [];
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private doctorService: DoctorService,
  private loginService:LoginService,private searchService:SearchService,public router:Router) {
   }

  ngOnInit() {
      this._cacheService.setGlobalPrefix("1.0.0");
      let  exists: boolean = this._cacheService.exists('doctor-comments');
      if(exists){
          this.loadCommentData = false;
          this.comments = this._cacheService.get('doctor-comments');
      }else{
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.doctorService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getcomments]).subscribe(data => {
                   
                    this.loadCommentData = false;
                    this.comments = data.results;
                    this.resetData = this.comments;
                    this.comments.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
                    this._cacheService.set('doctor-comments', this.comments, {maxAge: 10 * 60});
        });
      }
  }
  onReset(searchForm){
        searchForm.from = searchForm.to = searchForm.keyword = "";
        this.comments = this.resetData;
  }
  onSearch(serachform){
        this.searchService.getComments(serachform.from,serachform.to,this.session_id,serachform.keyword).subscribe(data =>{
            this.comments = data.results;
       })
  }
  testOnclick(test_id,record_id){
      this.router.navigate(['/doctor/tests',test_id, record_id]);
  }
}
