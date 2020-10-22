import { DoctorService } from './doctor.service';
import { BaseService } from './base.service';
import { Http, URLSearchParams,RequestMethod, Response,ResponseOptions, HttpModule, BaseRequestOptions, XHRBackend } from '@angular/http';
import { TestBed, inject , async} from '@angular/core/testing';
import { MockBackend, MockConnection, } from '@angular/http/testing'

describe('DoctorServiceTest', () => {
    let mockBackend : MockBackend;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
              imports: [HttpModule],
              providers:[
                  MockBackend,
                  BaseRequestOptions,
                  DoctorService,
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
    // inject let us get dependency from TestBed
    it('can instantiate service when inject service',
    inject([DoctorService], (service: DoctorService) => {
      expect(service instanceof DoctorService).toBe(true);
    }));

    it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new DoctorService(http);
    expect(service instanceof DoctorService).toBe(true, 'new service should be ok');
    }));

    it('can provide the mockBackend as XHRBackend',
    inject([MockBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  
    }));

    beforeEach(inject([ MockBackend, Http ],(mb: MockBackend, http: Http) => {
      mockBackend = mb;
    }));

    it('getRecord ...', inject([DoctorService ], (doctorService: DoctorService) => {
        const recordData ={
        "result": "success",
        "userid": "1241254",
        "id": 314,
        "length": "5 mins",
        "viewed": false,
        "from": "2015-06-07 13:30:00",
        "to": "2015-06-07 13:33:00",
        "content": "352363463463461363466134634163463414352643463463463463466346346346"
    }
    // we don't need async as MockBackend make calls synchronously
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
           // expect(connection.request.url).toEqual('app/heroes/?name=some term');
            connection.mockRespond(new Response(new ResponseOptions({
            body: {data: JSON.stringify(recordData)}
        })
        ))
        });
        expect(doctorService).toBeTruthy();
        doctorService.getRecord("Asa","aas").subscribe((res)=>{
            expect(JSON.parse(res.data).userid).toEqual('1241254');
            expect(JSON.parse(res.data).id).toBe(314);
        })
    }));
    it('getTestInfo ...', inject([DoctorService ], (doctorService: DoctorService) => {
        const TestInfo = {
            "result": "success",
            "userid": "1241254",
            "id": 314,
            "total_comments": 5,
            "total_notes": 13,
            "total_records": 9,
            "length": "55 mins",
            "viewed": false,
            "created": "2015-06-07 13:30:00",
            "record_page": 1,
            "records": [
                {
                "id": "125215",
                "from": "2015-05-05 15:00:02",
                "to": "2015-05-05 15:00:02",
                "legnth": "3 mins"
                }
            ],
            "comment_page": 1,
            "comments": [
                {
                "id": "531538",
                "userid": "1241254",
                "firstname": "imma",
                "lastname": "oliver",
                "content": "Interested students should apply ASAP for these positions. PMC-Sierra reviews applications submitted to their website as they come in - t",
                "for_record": {
                    "id": "4245125",
                    "created": "2015-05-02 20:00:05"
                },
                "for_note": null,
                "created": "2015-06-30 22:00:10",
                "viewed": true
                }
            ],
            "note_page": 1,
            "notes": [
                {
                "id": "531532",
                "userid": "1241254",
                "content": "Interested students should apply ASAP for these positions. PMC-Sierra reviews applications submitted to their website as they come in - t",
                "for_records": [
                    {
                    "id": "23525",
                    "from": "2015-05-04 12:00:15"
                    }
                ],
                "created": "2015-06-30 22:00:04"
                },
                
            ]
            }
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            connection.mockRespond(new Response(new ResponseOptions({
            body: {data: JSON.stringify(TestInfo)}
            })))
        });
        expect(doctorService).toBeTruthy();
        doctorService.getRecord("Asa","aas").subscribe((res)=>{
            expect(JSON.parse(res.data).result).toEqual('success');
            expect(JSON.parse(res.data).records.length).toBe(1);
        })
    }));


})