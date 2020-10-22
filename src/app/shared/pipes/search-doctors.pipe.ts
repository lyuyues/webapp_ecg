import { Pipe,PipeTransform } from '@angular/core';
@Pipe({
    name: "searchDoctors"
})
export class SearchDoctorsPipe  implements PipeTransform{
    transform(value:any,args:any):any{
        let keyword = args;
        return keyword ? value.filter(doctor => {
                keyword = keyword.toLocaleLowerCase();
                let firstname = doctor.firstname.toLocaleLowerCase().indexOf(keyword) != -1;
                let lastname = doctor.lastname.toLocaleLowerCase().indexOf(keyword) != -1;
                let username = doctor.username?doctor.username.toLocaleLowerCase().indexOf(keyword)!=-1:false ;
                let hospital = doctor.hospital?doctor.hospital.toLocaleLowerCase().indexOf(keyword)!=-1:false ;
                let phone = doctor.phone?doctor.phone.toLocaleLowerCase().indexOf(keyword)!=-1:false;
                let date = doctor.connected_date?doctor.connected_date.toLocaleLowerCase().indexOf(keyword)!=-1:false;
                let filtered = firstname || lastname || username || hospital || phone || date;
                return filtered;
        }):value;
    }
}