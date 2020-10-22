import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { EcgDataDragZoomComponent } from './ecg-data-drag-zoom/ecg-data-drag-zoom.component';
import { EcgDataDragZoom2Component } from './ecg-data-drag-zoom-2/ecg-data-drag-zoom-2.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchDoctorsPipe } from './shared/pipes/search-doctors.pipe';
import { SearchPatientsPipe } from './shared/pipes/search-patients.pipe';
import { SearchNotePipe } from './shared/pipes/search-note.pipe';
@NgModule({
  imports: [ CommonModule],
  declarations: [
    SearchDoctorsPipe,SearchPatientsPipe,SearchNotePipe,SearchBoxComponent,
    EcgDataDragZoomComponent,EcgDataDragZoom2Component
  ],
  exports:[SearchDoctorsPipe,SearchPatientsPipe,SearchNotePipe,SearchBoxComponent,
  EcgDataDragZoomComponent,EcgDataDragZoom2Component]
})
export class SharedModule { }