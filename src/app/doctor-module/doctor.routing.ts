import { NgModule }     from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { DoctorComponent } from './doctor.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorCommentsComponent } from './doctor-comments/doctor-comments.component';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { DoctorNewPatientComponent }from './doctor-new-patient/doctor-new-patient.component';
import { DoctorNotesComponent } from './doctor-notes/doctor-notes.component';
import { DoctorTestsComponent} from './doctor-tests/doctor-tests.component';
import { DoctorEcgComponent } from './doctor-ecg/doctor-ecg.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
const routes: Routes = [
  { path: '',
    component: DoctorComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', pathMatch:'full',redirectTo:'dashboard' },
      { path: 'dashboard',    component: DoctorDashboardComponent,canActivate: [AuthGuardService] },
      { path: 'comments',    component: DoctorCommentsComponent,canActivate: [AuthGuardService]  },
      { path: 'patients',    component: DoctorPatientsComponent,canActivate: [AuthGuardService]  },
      { path: 'tests',    component: DoctorTestsComponent,canActivate: [AuthGuardService]  },
      { path: 'new_patient',component: DoctorNewPatientComponent,canActivate: [AuthGuardService] },                        
      { path: 'tests/:id/:record_id',component: DoctorEcgComponent,canActivate: [AuthGuardService] },                                                      
      { path: 'notes', component: DoctorNotesComponent,canActivate: [AuthGuardService] },                        
      { path: 'profile',component: DoctorProfileComponent,canActivate: [AuthGuardService] }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {}

