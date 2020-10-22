import { Pipe,PipeTransform } from '@angular/core';
@Pipe({
    name: "searchPatients"
})
export class SearchPatientsPipe  implements PipeTransform{
    transform(value:any,args:any):any{
        let keyword = args;
        return keyword ? value.filter(patient => {
                keyword = keyword.toLocaleLowerCase();
                let firstname = patient.firstname.toLocaleLowerCase().indexOf(keyword) != -1;
                let lastname = patient.lastname.toLocaleLowerCase().indexOf(keyword) != -1;
                let username = patient.username?patient.username.toLocaleLowerCase().indexOf(keyword)!=-1:false ;
                let medical_plan_number = patient.medical_plan_number?patient.medical_plan_number.toLocaleLowerCase().indexOf(keyword)!=-1:false ;
                let phone = patient.phone?patient.patient.toLocaleLowerCase().indexOf(keyword)!=-1:false;
                let date = patient.connected_date?patient.connected_date.toLocaleLowerCase().indexOf(keyword)!=-1:false;
                let session = patient.last_login?patient.last_login.toLocaleLowerCase().indexOf(keyword)!=-1:false;
                let filtered = firstname || lastname || username || medical_plan_number || phone || date ||session;
        }):value;
    }
}