import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AreaComponent } from './widget/area/area.component';
import {HighchartsChartModule} from "highcharts-angular";
import { DepartmentComponent } from '../modules/department/department.component';
import { EducationLevelComponent } from '../modules/education-level/education-level.component';
import { KebelleComponent } from '../modules/kebelle/kebelle.component';
import { NationalityComponent } from '../modules/nationality/nationality.component';
import { PositionComponent } from '../modules/position/position.component';
import { RegionComponent } from '../modules/region/region.component';
import { ReligionComponent } from '../modules/religion/religion.component';
import { WoredaComponent } from '../modules/woreda/woreda.component';
import { ZoneComponent } from '../modules/zone/zone.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { CreateEmployeeComponent } from '../modules/create-employee/create-employee.component';
import {MatGridListModule, MatGridTileText} from '@angular/material/grid-list';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditEmployeeComponent } from '../modules/edit-employee/edit-employee.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    DepartmentComponent,
    EducationLevelComponent,
    CreateEmployeeComponent,
    KebelleComponent,
    NationalityComponent,
    PositionComponent,
    RegionComponent,
    ReligionComponent,
    WoredaComponent,
    ZoneComponent,
    EditEmployeeComponent
    
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    RouterModule,
    HighchartsChartModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    MatSelectModule,
    TextFieldModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    //MatMomentDateModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent
  ]
})
export class SharedModule { }
