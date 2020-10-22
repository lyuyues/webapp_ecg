import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { SearchService } from '../../shared/services/search.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { Methods } from '../../shared/data/method-enum';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-patient-comments',
  templateUrl: './patient-comments.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-comments.component.css']
})
export class PatientCommentsComponent implements OnInit {
  comments : any = [];
  session_id: string;
  userid: number;
  usercol: string;
  loadCommentData: boolean = true;
  resetData: any = [];
  constructor(private _cacheService: CacheService,private cookieService:CookieService,private patientService: PatientService,
  private searchService:SearchService, private loginService:LoginService,public router:Router) { 

  }

  ngOnInit() {
      this._cacheService.setGlobalPrefix("1.0.0");
      let  exists: boolean = this._cacheService.exists('comments');
      if(exists){
          this.comments = this._cacheService.get('comments');
          this.loadCommentData = false;
      }else{
          this.session_id = this.cookieService.get('sessionId');
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.patientService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getcomments]).subscribe(data => {            
                  this.comments = data.results;
                  this.resetData = this.comments;
                  this.comments.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
                  this.loadCommentData = false;                  
                  this._cacheService.set('comments', this.comments, {maxAge: 10 * 60});
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
        this.router.navigate(['/patient/tests',test_id,record_id]);
  }
}
