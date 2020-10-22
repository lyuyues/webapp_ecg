import { Component, OnInit,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from "file-saver";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { TextEncoder } from 'text-encoding';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { Note} from'../../shared/data/note';
import { DownloadData} from '../../shared/data/downloaded-data';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.csv';
import { D3Service, D3, D3DragEvent, D3ZoomEvent,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition} from 'd3-ng2-service';
@Component({
  selector: 'app-patient-ecg',
  templateUrl: './patient-ecg.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-ecg.component.css']
})

export class PatientEcgComponent implements OnInit {
  testdata: any = [];
  notes: any = [];
  comments: any = [];
  records: any = [];
  session_id: string;
  isActive: number = 0;
  note: Note = new Note();
  record_id;
  data;
  data2;
  channel1: any =[];
  channel2: any =[];
  channel1_download: any =[];
  channel2_download: any =[];
  length;
  mask: boolean = true;
  record_data;
  constructor(private cookieService:CookieService,private patientService: PatientService,
  private loginService:LoginService,private route: ActivatedRoute) {

  }
  ngOnInit() {
      this.session_id = this.cookieService.get('sessionId');
      this.patientService.getTestInfo(this.route.snapshot.params['id'],this.session_id).subscribe(data => {
            this.testdata = data;
            this.notes = data.notes;
            this.comments = data.comments;
            this.records = data.results;  
            this.record_id = this.route.snapshot.params['record_id'];
            if(this.route.snapshot.params['record_id']=="null"){
                this.record_id = this.records[0].id;
            } 
            this.patientService.getRecord(this.session_id,this.record_id).subscribe(data => {
                let result = data; 
                this.record_data = data;              
                this.isActive = 0;  
                this.getChannelData(result.content);                               
        });
      })
   
  }
  getChannelData(content){
               // var decodedata = Base64.decode(content);  // ZGFua29nYWk=
               // 64 decode
                var decodedata = atob(content);         
                var decodestringdata = [];
                decodestringdata = decodedata.split("");
                var datalist = [];
                decodestringdata.map(function (e) { datalist.push(e.charCodeAt()) });              
                this.channel1.length = this.channel2.length = 0;
                var totalList = [];
                for(var i = 0; i<datalist.length*2/5;i=i+2){
                    var index = i*5/2; 
                    index++;
                    totalList[i] = datalist[index++];
                    totalList[i] = totalList[i] << 8; //higher 8 bits
                    totalList[i] = totalList[i] + (datalist[index++]& 0xFF);// channel1 = higher 8 bits + low 8 bits
                    totalList[i+1] = datalist[index++];
                    totalList[i+1] = totalList[i+1] << 8;
                    totalList[i+1] += (datalist[index++] & 0xFF);
                }
                for(var i = 0;i < totalList.length;i=i+2){
                   this.channel1.push([i/500, 10*totalList[i]*4.84/(65536-1)]);
                   this.channel1_download.push(10*totalList[i]*4.84/(65536-1));
                   this.channel2.push([i/500, 10*totalList[i+1]*4.84/(65536-1)]);
                   this.channel2_download.push(10*totalList[i+1]*4.84/(65536-1))
                }

                this.length = this.channel1.length;
                
                this.mask = false;
  }
  onClickEcg(recordId, index){
            this.mask = true;
   
            this.record_id = recordId;
            this.patientService.getRecord(this.session_id,recordId).subscribe(data => {
                this.isActive = index;
                let result = data;
                 
                this.getChannelData(result.content);
        });
  }
  onSubmit(noteForm){
       if(noteForm.noteContent==""){
            alert('please input note content!')
        } else{
             this.note.content = noteForm.noteContent;
              this.note.test_id = this.route.snapshot.params['id'];
              this.note.record_id = this.record_id;
           
              this.patientService.leaveNote(this.note,this.session_id).subscribe(data => {
        
                    if(data.result == "success"){
                        alert('Created note successfully!')
                    }
              })        
        }
  }
  onDownload(){
    var tt = [];
    var newData = new DownloadData(this.record_data.from,this.record_data.to,this.record_data.length +' seconds',this.record_data.userid,this.record_data.id,this.channel1_download[0],this.channel2_download[0]);
    tt.push(newData);
    for(var i = 1;i < this.channel1_download.length;i++){
        var newData = new DownloadData('','','','','',this.channel1_download[i],this.channel2_download[i]);
        tt.push(newData);
    }
    var options = { 
    showLabels: true, 
    showTitle: false,
    useBom: false,
    title:'Record',
    headers:['from','to','length','userid','recordid','channal_1','channal_2']
  };
    var csv = new Angular2Csv(tt, 'Record_data',options);

    }
}
