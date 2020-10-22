import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataTableModule } from 'angular2-datatable';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { D3Service } from 'd3-ng2-service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CacheService } from 'ng2-cache/ng2-cache';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule, appRoutingProviders, navigatableComponents } from './app.routing';
import { FooterComponent } from './footer/footer.component';

import { LoginService } from './shared/services/login.service';
import { HomeService } from './shared/services/home.service';
import { PatientService } from './shared/services/patient.service';
import { DoctorService } from './shared/services/doctor.service';
import { SearchService } from './shared/services/search.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    ...navigatableComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule ,
    DataTableModule,
    Ng2BootstrapModule,
    ToastModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBadskS0IlHxNvMWszulsrvK2A_hF3hR0Y'
    })
  ],
  providers: [appRoutingProviders, CacheService,{provide: LocationStrategy, useClass: HashLocationStrategy}, D3Service,{ provide: CookieService, useFactory: cookieServiceFactory }, LoginService, HomeService, PatientService, DoctorService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function cookieServiceFactory() { return new CookieService(); }
