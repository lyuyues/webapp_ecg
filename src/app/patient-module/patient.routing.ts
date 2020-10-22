import { NgModule }     from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { PatientComponent }       from './patient.component';
import { PatientDashboardComponent }   from './patient-dashboard/patient-dashboard.component';
import { PatientCommentsComponent } from './patient-comments/patient-comments.component';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientEcgComponent } from './patient-ecg/patient-ecg.component';
import { PatientTestsComponent } from './patient-tests/patient-tests.component';
import { PatientLeaveNoteComponent } from './patient-leave-note/patient-leave-note.component';
import { PatientNotesComponent } from './patient-notes/patient-notes.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientAuthGuardService } from '../shared/services/Auth-guard-patient.service';
const routes: Routes = [
  { path: '',
    component: PatientComponent,
    canActivate: [PatientAuthGuardService],
    children: [
      { path: '', pathMatch:'full',redirectTo:'dashboard' },
      { path: 'dashboard',    component: PatientDashboardComponent, canActivate: [PatientAuthGuardService]},
      { path: 'comments',    component: PatientCommentsComponent,canActivate: [PatientAuthGuardService]},
      { path: 'doctors',    component: PatientDoctorsComponent,canActivate: [PatientAuthGuardService] },
      { path: 'tests',    component: PatientTestsComponent,canActivate: [PatientAuthGuardService] },
      { path: 'tests/:id/:record_id',    component: PatientEcgComponent,canActivate: [PatientAuthGuardService] },
      { path: 'leave_note',    component: PatientLeaveNoteComponent ,canActivate: [PatientAuthGuardService]},
      { path: 'notes',    component: PatientNotesComponent,canActivate: [PatientAuthGuardService] },
      { path: 'profile',    component: PatientProfileComponent,canActivate: [PatientAuthGuardService] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}