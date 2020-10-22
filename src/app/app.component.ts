import { Component,OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service'
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./bootstrap-custom.css', './common.css', './app.component.css']
})
export class AppComponent implements OnInit{
  logined:boolean;
  constructor(private loginService:LoginService){
  }
  ngOnInit(){
    this.loginService.changeEmitted$.subscribe((text)=>{
      this.logined = text;
    });

}
}
