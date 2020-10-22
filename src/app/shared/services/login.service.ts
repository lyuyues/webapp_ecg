import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { UserLogin } from '../data/user-login';
import { DoctorSignup } from '../data/doctor-signup';
import { PatientSignup } from '../data/patient-signup';
import { BaseService } from './base.service';

@Injectable()
export class LoginService extends BaseService {

    @Output()userLogined = new EventEmitter();

    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }


    public isLoggedIn: boolean = false;
    public loggedInUser :string;
    public redirectUrl: string;
    private  session_id: string = null;
    public  setSessionId(sid: string): void {
        this.session_id = sid;
    }
    public  getSessionId(): string {
        return this.session_id;
    }
    public clearSessionId(): void {
        this.session_id = null;
    }
    public getIsLoggedIn(){
         
    }
    constructor(http: Http) {
        super('', http);
    }
    public login(userLogin: UserLogin,patient: boolean){
            let body = JSON.stringify(userLogin);
            let path:string;
            if(patient){
                path = 'patient/login';
                this.redirectUrl = '/patient';
            }else{
                path = 'doctor/login';
                this.redirectUrl = '/doctor';
            }
            return this.post(body, path)
                .map(response => {
                    let json = response.json();
                    if(json.result == "success"){
                        this.isLoggedIn = true;
                        this.emitChange(this.isLoggedIn);
                        this.loggedInUser = json.usercol;
                        this.setSessionId(json.session_id);}
                    return json;
                }).catch(this.handleError);        
    }
    public logout(patient:boolean) {
        let session_id = this.getSessionId();
        let body = JSON.stringify({"session_id":session_id});
        let path: string;
        if(patient){
                path = 'patient/logout';
            }else{
                path = 'doctor/logout';
        }
        return this.post(body, path)
                .map(res =>{
                    let json= res.json();
                    if(json.result == "success"){
                        this.clearSessionId();
                        this.isLoggedIn  = false;
                        this.emitChange(this.isLoggedIn);
                        this.loggedInUser = "";
                    }
                    return json;
                }).catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg: string = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        this.clearSessionId();
        return Observable.throw(errMsg);
    }
}