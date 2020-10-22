import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { DoctorComponent }       from './doctor.component';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorNotesComponent } from './doctor-notes/doctor-notes.component';
import { DoctorCommentsComponent } from './doctor-comments/doctor-comments.component';
import { DoctorTestsComponent } from './doctor-tests/doctor-tests.component';
import { DoctorNewPatientComponent } from './doctor-new-patient/doctor-new-patient.component';
import { DoctorEcgComponent } from './doctor-ecg/doctor-ecg.component';
import { DoctorRoutingModule }   from './doctor.routing';
import { SharedModule} from '../shared.module';

@NgModule({
  imports: [ CommonModule, FormsModule, DataTableModule, DoctorRoutingModule, SharedModule],
  declarations: [
    DoctorComponent, DoctorDashboardComponent, DoctorNotesComponent,
    DoctorCommentsComponent, DoctorTestsComponent, DoctorNewPatientComponent,
    DoctorEcgComponent, DoctorProfileComponent, DoctorPatientsComponent,
  ]
})
export class DoctorModule { }