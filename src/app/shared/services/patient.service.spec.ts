import { PatientService } from './patient.service';
import { BaseService } from './base.service';
import { Http, URLSearchParams,RequestMethod, Response,ResponseOptions, HttpModule, BaseRequestOptions, XHRBackend } from '@angular/http';
import { TestBed, inject , async} from '@angular/core/testing';
import { MockBackend, MockConnection, } from '@angular/http/testing'

describe('PatientServiceTest', () => {
    let mockBackend : MockBackend;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
              imports: [HttpModule],
              providers:[
                  MockBackend,
                  BaseRequestOptions,
                  PatientService,
                  //Tell injector to inject an instance of MockBackend whenever someone asks for an XHRBackend, 
                  {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                        (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backend, defaultOptions);
                        }
                 }
              ]
        });

    }));
    beforeEach(inject([ MockBackend, Http ],(mb: MockBackend, http: Http) => {
      mockBackend = mb;
    }));

    it('getRecord ...', inject([PatientService ], (patientService: PatientService) => {
        const recordDataPatient ={
        "result": "success",
        "userid": "1241254",
        "id": 314,
        "length": "5 mins",
        "viewed": false,
        "from": "2015-06-07 13:30:00",
        "to": "2015-06-07 13:33:00",
        "content": "352363463463461363466134634163463414352643463463463463466346346346"
        }
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            connection.mockRespond(new Response(new ResponseOptions({
            body: {data: JSON.stringify(recordDataPatient)}
            })))
        });
        expect(patientService).toBeTruthy();
        patientService.getRecord("Asa","aas").subscribe((res)=>{
            expect(JSON.parse(res.data).userid).toEqual('1241254');
            expect(JSON.parse(res.data).id).toBe(314);
        })
    }));


})