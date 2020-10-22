import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { SearchService } from '../../shared/services/search.service';
import { Methods } from '../../shared/data/method-enum';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
import { LoginService } from '../../shared/services/login.service';
@Component({
  selector: 'app-patient-tests',
  templateUrl: './patient-tests.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-tests.component.css']
})
export class PatientTestsComponent implements OnInit {
  data: any = [];
  originalData: any = [];
  session_id: string;
  userid: number;
  usercol: string;
  loadTestData: boolean = true;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,private patientService: PatientService,
  private loginService:LoginService,private searchService:SearchService,public router: Router) { }

  ngOnInit() {
      this._cacheService.setGlobalPrefix("1.0.0");
      this.session_id = this.cookieService.get('sessionId');
      this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
      this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
      let  exists: boolean = this._cacheService.exists('tests');
      if(exists){
            this.data = this._cacheService.get('tests');
            this.loadTestData = false;
      }else{
            this.patientService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.gettests]).subscribe(data => {
                    this.data = data.results;
                    this.originalData = this.data;
                    this.data.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
                    this.loadTestData = false;
                    this._cacheService.set('tests', this.data, {maxAge: 10 * 60});
            });    
      }
  }
  testOnclick(test_id){
    
      this.router.navigate(['/patient/tests',test_id,"null"]);
  }
  onReset(searchForm){
      searchForm.from = searchForm.to = "";
      this.data = this.originalData;
  }
  onSearch(searchform){

      this.searchService.getTests(this.session_id,this.userid.toString(),searchform.from,searchform.to,searchform.comment,searchform.note).subscribe(data =>{
   
          this.data = data.results;

     })
  }

}
