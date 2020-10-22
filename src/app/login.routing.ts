import { Routes } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { PatientAuthGuardService } from './shared/services/Auth-guard-patient.service';
import { HomeComponent } from './home/home.component';

export const loginRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    }
];

export const authProviders = [
    AuthGuardService,PatientAuthGuardService
];
