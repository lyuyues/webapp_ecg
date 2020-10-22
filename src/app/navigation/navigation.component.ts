import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css','./navigation.component.css']
})
export class NavigationComponent implements OnInit,OnChanges {
  usercol: string;
  userurl: string;
  @Input('logined')logined:boolean;

  constructor(private loginService: LoginService, private cookieService: CookieService) { }
  ngOnChanges(changes: any) {

    
    this.logined = changes.logined.currentValue;
    if(this.logined){
      this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
      this.userurl ="/"+this.usercol+"/profile";
    }
    
  }
  ngOnInit() {
    this.logined = this.loginService.isLoggedIn;
  }

}
