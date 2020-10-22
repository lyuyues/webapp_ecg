import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { DoctorService } from '../../shared/services/doctor.service';
import { LoginService } from '../../shared/services/login.service';
import { Comment } from'../../shared/data/comment';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
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
  selector: 'app-doctor-ecg',
  templateUrl: './doctor-ecg.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','../../patient-module/patient-ecg/patient-ecg.component.css','./doctor-ecg.component.css']
})
export class DoctorEcgComponent implements OnInit {
  testdata: any = [];
  notes: any = [];
  comments: any = [];
  records: any = [];
  session_id: string;
  testTime: string;
  comment: Comment = new Comment();
  isActive: number = 0;
  record_id;
  patient_id;
  data;
  data2;
  channel1: any =[];
  channel2: any =[];
  length;
  mask: boolean = true;
  constructor(private cookieService:CookieService,private doctorService: DoctorService,
  private loginService:LoginService,private route: ActivatedRoute) { }

  ngOnInit() {
        this.session_id = this.cookieService.get('sessionId');
        this.doctorService.getTestInfo(this.route.snapshot.params['id'],this.session_id).subscribe(data => {
            this.testdata = data;
            this.notes = data.notes;
            this.comments = data.comments;
            this.records = data.results;
            this.record_id = this.route.snapshot.params['record_id'];
            if(this.route.snapshot.params['record_id']=="null"){
                this.record_id = this.records[0].id;
            }
            this.patient_id = this.testdata.userid;
            this.doctorService.getRecord(this.session_id,this.record_id).subscribe(data => {
                let result = data; 
                this.isActive = 0;  
                this.getChannelData(result.content); 
        });
      });
  }
getChannelData(content){
                var decodedata = atob(content);  // Base64 decode
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
                   this.channel2.push([i/500, 10*totalList[i+1]*4.84/(65536-1)]);
                }
                this.length = this.channel1.length;
                this.mask = false;
  }
  onClickEcg(recordId, index){
            this.mask = true;
            this.record_id = recordId;
            this.doctorService.getRecord(this.session_id,recordId).subscribe(data => {
                this.isActive = index;
                let result = data; 
                this.getChannelData(result.content);
        });
  }
  onSubmit(commentForm){
        if(commentForm.commentCentent==""){
            alert('please input comment content!')
        } else{
            this.comment.content = commentForm.commentCentent;
            this.comment.patient_id = this.patient_id;
            this.comment.record_id = this.record_id;
            this.doctorService.leaveComment(this.comment,this.session_id).subscribe(data => {
                if(data.result == "success"){
                    alert('Created comment successfully!')
                }
            })
        }

  }
}
