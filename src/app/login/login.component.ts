import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router }      from '@angular/router';
import { UserLogin } from '../shared/data/user-login';
import { UserInfo } from '../shared/data/user-info';
import { LoginService } from '../shared/services/login.service';
import { CookieOptionsArgs, CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  patientLoginShow: boolean = true;
  isActive:boolean = true;
  userlogin: UserLogin = new UserLogin();
  loginError: boolean = false;
  public userType: string = "Patient";
  constructor(private cookieService:CookieService,private loginService: LoginService,public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router) {
        this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {

  }
  onTaggleDisplay(type:boolean){
        if(type){this.patientLoginShow = this.isActive = true;
        }else{this.patientLoginShow = this.isActive = false;}
        this.userType = this.patientLoginShow ? "Patient" : "Doctor";
  }
  onSubmit(patientInfo: UserLogin) { 
    this.userlogin.username = patientInfo.username;
    this.userlogin.password = patientInfo.password;
            this.loginService.login(this.userlogin,this.patientLoginShow).subscribe((res) => {
              if(this.loginService.isLoggedIn){
                    let userinfo = new UserInfo();
                    userinfo.result = res.result;
                    userinfo.usercol = res.usercol;
                    userinfo.userid = res.userid;
                    let now = new Date();
                    now.setMinutes(now.getMinutes() + 20);
                    let options:CookieOptionsArgs = { expires:now};
                    this.cookieService.put('user_info',JSON.stringify(userinfo),options);   
                    let user = this.patientLoginShow ? '/patient':'/doctor';              
                    let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : user;
                    this.toastr.success("Redirecting to  user page!","Login Successfully!")
                    setTimeout(()=>{
                          this.router.navigate([redirect]);
                    },500)
                    
              }else{
                    this.toastr.error('Wrong username or password!', 'Oops');
              }
          }, err => this.handleError(err));
  }
  private handleError(response): void {
        console.error('Unable to login', response);
    }
}
