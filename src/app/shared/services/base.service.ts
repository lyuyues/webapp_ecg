import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

export class BaseService {
    constructor(private servicePath: string, private http: Http) {
     }

    public get(path?: string| number, params?: URLSearchParams) {
        let url: string = environment.apiUrl + this.servicePath;
        if (path) {
            url += '/' + path;
        }

        let options = this.createAuthorizedRequestOptions();
        if (params) {
            options.search = params;
        }
        return this.http.get(url, options);
    }
    public delete(path?:number){
        let url: string = environment.apiUrl + this.servicePath;
        if (path) {
            url += '/' + path;
        }
        let options = this.createAuthorizedRequestOptions();
        return this.http.delete(url, options);        
    }
    public post(body: string, path?: string){
        let url: string = environment.apiUrl + this.servicePath;
        if (path) {
            url += '/' + path;
        }
        let options = this.createAuthorizedRequestOptions();
        options.headers.append('Content-Type', 'application/json');
        return this.http.post(url, body, options);
    }
    private createAuthorizedRequestOptions(): RequestOptions {
        let headers = new Headers({  });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}