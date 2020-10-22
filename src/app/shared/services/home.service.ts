import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UserLogin } from '../data/user-login';
import { DoctorSignup } from '../data/doctor-signup';
import { PatientSignup } from '../data/patient-signup';
import { BaseService } from './base.service';

@Injectable()
export class HomeService extends BaseService {

    constructor(http: Http) {
        super('', http);
    }
    public patientSignup(patientSignup:PatientSignup){
        let body = JSON.stringify(patientSignup);
        let path:string = 'patient/register';
        return this.post(body, path)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);        
    }
    public doctorSignup(doctorSignup: DoctorSignup){
        let body = JSON.stringify(doctorSignup);
        let path:string = 'doctor/register';
        return this.post(body, path)
            .map(response => {
                let json= response.json();
            }).catch(this.handleError);        
    }    
    private handleError(error: any) {
        let errMsg: string = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}