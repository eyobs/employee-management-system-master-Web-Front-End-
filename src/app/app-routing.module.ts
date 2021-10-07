import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefualtComponent} from './layouts/defualt/defualt.component'
import { CreateEmployeeComponent } from './modules/create-employee/create-employee.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DepartmentComponent } from './modules/department/department.component';
import { EducationLevelComponent } from './modules/education-level/education-level.component';
import { KebelleComponent } from './modules/kebelle/kebelle.component';
import { NationalityComponent } from './modules/nationality/nationality.component';
import { PositionComponent } from './modules/position/position.component';
import { PostsComponent } from './modules/posts/posts.component';
import { RegionComponent } from './modules/region/region.component';
import { ReligionComponent } from './modules/religion/religion.component';
import { WoredaComponent } from './modules/woreda/woreda.component';
import { ZoneComponent } from './modules/zone/zone.component';

const routes: Routes = [{
  path: '', component: DefualtComponent,
  children: [
    { path: '', component:DashboardComponent  },
    { path: 'posts', component:PostsComponent  },
    { path: 'department', component:DepartmentComponent  },
    { path: 'education', component:EducationLevelComponent  },
    { path: 'kebelle', component:KebelleComponent  },
    { path: 'nationality', component:NationalityComponent  },
    { path: 'position', component:PositionComponent  },
    { path: 'region', component:RegionComponent  },
    { path: 'religion', component:ReligionComponent  },
    { path: 'woreda', component:WoredaComponent  },
    { path: 'zone', component:ZoneComponent  },
    {path : 'createEmployee', component:CreateEmployeeComponent}
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }