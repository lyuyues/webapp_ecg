import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router }      from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DoctorSignup } from '../shared/data/doctor-signup';
import { PatientSignup } from '../shared/data/patient-signup';
import { HomeService } from '../shared/services/home.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  patientSignupShow: boolean = true;
  isActive: boolean = true;
  signupsuccess: boolean = false;
  constructor(private homeService: HomeService,public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router) { 
        this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }
  onSubmit(doctor) {    

    if(this.patientSignupShow){
            let  patientSignup: PatientSignup = new PatientSignup(doctor.firstname,doctor.lastname,doctor.gender,
            doctor.birthday,doctor.username,doctor.password,doctor.phone,doctor.address,doctor.medicalplannumber,doctor.subscribe);
          
            this.homeService.patientSignup(patientSignup).subscribe((res) => {

            if(res.result == "success"){      
                  this.toastr.success("Redirecting to  login page!","Signup Successfully!")
                  setTimeout(() => {
                          this.router.navigate(['/login']);
                    },2000);
            }else{
                  this.toastr.error('Something Wrong, try again ', 'Oops');
            }
          }, err => this.handleError(err));
    }else{
            let  doctorSignup: DoctorSignup = new DoctorSignup(doctor.firstname,doctor.lastname,doctor.gender,
            doctor.birthday,doctor.username,doctor.password,doctor.phone,doctor.address,doctor.hospital,doctor.subscribe);
            
            this.homeService.doctorSignup(doctorSignup).subscribe((res) => {
       
            if(res.result == "success"){
                this.toastr.success("Redirecting to  login page!","Signup Successfully!")
                setTimeout(() => {
                          this.signupsuccess = false;
                    },2000);                
            }else{
                  this.toastr.error('Something Wrong, try again ', 'Oops');
            }
          }, err => this.handleError(err));
    }    
  }
  private handleError(response): void {
        console.error('Unable to login', response);
    }

}
