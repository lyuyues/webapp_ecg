import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { BaseService } from './base.service';
@Injectable()
export class SearchService extends BaseService {

    constructor(http: Http) {
        super('', http);
    }
    public getComments(fromDate:string,toDate:string,session_id: string, keyword: string){
       let params: URLSearchParams = new URLSearchParams();
        params.set('session_id', session_id);
        params.set('from', fromDate);
        params.set('to', toDate);
        if (keyword != "") {
             params.set('keyword', keyword);
        }
        let path: string = 'search/getcomments';
        return this.get(path,params)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);        
    }
    public getTests(session_id: string,patientiId:string,from: string, to: string,comment:string,note:string){
       let params: URLSearchParams = new URLSearchParams();
        params.set('session_id', session_id);
        params.set('from', from);
        params.set("to",to);
        params.set("patient_id",patientiId);
        params.set("comment",comment);
        params.set("note",note);
        let path: string = 'search/gettests';
        return this.get(path,params)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);        
    }
    private handleError(error: any) {
        let errMsg: string = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}