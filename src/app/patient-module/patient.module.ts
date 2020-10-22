import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { PatientComponent }       from './patient.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientCommentsComponent } from './patient-comments/patient-comments.component';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientTestsComponent } from './patient-tests/patient-tests.component';
import { PatientEcgComponent } from './patient-ecg/patient-ecg.component';
import { PatientLeaveNoteComponent } from './patient-leave-note/patient-leave-note.component';
import { PatientNotesComponent } from './patient-notes/patient-notes.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientRoutingModule }   from './patient.routing';
import { SharedModule} from '../shared.module';
@NgModule({
  imports: [ CommonModule, FormsModule, DataTableModule, PatientRoutingModule, SharedModule ],
  declarations: [
    PatientComponent, PatientDashboardComponent, PatientCommentsComponent,
    PatientDoctorsComponent, PatientEcgComponent, PatientLeaveNoteComponent,
    PatientNotesComponent, PatientProfileComponent, PatientTestsComponent,
  ]
})
export class PatientModule { }