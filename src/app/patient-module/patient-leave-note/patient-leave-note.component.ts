import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { SearchService } from '../../shared/services/search.service';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { Methods } from '../../shared/data/method-enum';
import { Note } from '../../shared/data/note';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-patient-leave-note',
  templateUrl: './patient-leave-note.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-leave-note.component.css']
})
export class PatientLeaveNoteComponent implements OnInit {
  data: any;
  session_id: string;
  userid: number;
  testsShow: boolean;
  note = new Note();
  constructor(private cookieService:CookieService,private patientService: PatientService,
  private searchService:SearchService,private loginService: LoginService, public router:Router) { }

  ngOnInit() {
      this.session_id = this.cookieService.get('sessionId');
      this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
  }
  onSearch(from,to){
    this.searchService.getTests(this.session_id,this.userid.toString(),from,to,"false","false").subscribe(data =>{
      this.data = data.results;

        if(this.data.length ==0){
        this.testsShow = true;
      }
    })
  }
testOnclick(testId:string){
   
    this.note.test_id = testId;

}
onSubmit(form){
    if(form.noteContent == ""){
      alert("please input note content!");
    }else{
      this.note.content = form.noteContent;
      this.note.time = form.occurrenceTime ? form.occurrenceTime: undefined;

      this.patientService.leaveNote(this.note,this.session_id).subscribe( data =>{

        if(data.result == "success"){
            alert("Create note successfully!");
        }
      })
    }

}

}
