import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { NgModule }             from '@angular/core';
import { loginRoutes, authProviders } from './login.routing';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent }from './contact-us/contact-us.component';

export  const appRoutes: Routes = [
    ...loginRoutes,
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path:'doctor',
        loadChildren:'app/doctor-module/doctor.module#DoctorModule'

    },
    {
        path:'patient',
        loadChildren:'app/patient-module/patient.module#PatientModule'

    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'aboutus',
        component: AboutUsComponent,
    },
    {        
        path: 'contactus',
        component: ContactUsComponent,

    },
    {        
        path: 'login',
        component: LoginComponent,

    },   
    {        
        path: 'signup',
        component: SignupComponent,

    }
];

export const appRoutingProviders: any[] = [
    authProviders
];
//use the static RouterModule.forRoot method at the application-level only. 
//If we were to set up routing at lower-levels, we would use the static RouterModule.forChild method,
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
export const navigatableComponents = [
  LoginComponent,
  SignupComponent,
  AboutUsComponent,
  HomeComponent,
  ContactUsComponent
];