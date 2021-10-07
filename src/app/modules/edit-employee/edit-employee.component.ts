import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  employee:Employee
  form:FormGroup;
  PositionList:any
  EducationalLevelList:any
  ReligionList:any
  NationList:any
  ZoneList:any
  RegionList:any
  WoredaList:any
  KebelleList:any
  finalZoneList:any[] = new Array();
  finalWoredaList:any[] = new Array();
  finalKebelleList:any[] = new Array();
  constructor(private service:EmployeeService, private toastr:ToastrService, private dialogRef: MatDialogRef<EditEmployeeComponent>,@Inject(MAT_DIALOG_DATA) data:Employee) { 
    this.employee = data
  }

  ngOnInit(): void {
    this.GetPostions();
    this.GetReligions();
    this.GetEducaitonalLevels();
    this.GetNationality();
    this.GetRegionList();
    this.GetZoneList();
    this.GetWoredaList();
    this.GetKebelle();
  }

  //nationalities (country)
GetNationality() {
  this.service.getNationality().subscribe((res) => {
    if (res) {
      this.NationList = res;
    } else {
        console.log('Error');
    }
  }, (err) => {
    console.log(err)
  }
  );
}

//religion
GetReligions() {
  this.service.getReligion().subscribe((res) => {
    if (res) {
      this.ReligionList = res;
    } else {
        console.log('Error');
    }
  }, (err) => {
    console.log(err)
  }
  );
}
//educational level
GetEducaitonalLevels() {
  this.service.getEducationalLevel().subscribe((res) => {
    if (res) {
      this.EducationalLevelList = res;
    } else {
        console.log('Error');
    }
  }, (err) => {
    console.log(err)
  }
  );
}
//position
GetPostions() {
  this.service.getPosition().subscribe((res) => {
    if (res) {
      this.PositionList = res;
    } else {
        console.log('Error');
    }
  }, (err) => {
    console.log(err)
  }
  );
}
//region
GetRegionList() {
  this.service.getRegions().subscribe((res) => {
    if (res) {
      this.RegionList = res;
    } else {
      console.log('error');
    }
  }
  );
}
//zone

GetZoneList() {
  this.service.getZone().subscribe((res)=>{
    if(res){      
        this.ZoneList =res
    }
  })
}
zoneSelecting(event:Event) {
this.finalZoneList =[];
  this.ZoneList.forEach((zon:any) =>{ 
    if(zon.regionId == event)
    {
       this.finalZoneList.push(zon);
    }
    });
}


//woreda
GetWoredaList() {
  this.service.getWoreda().subscribe((res) => {
    if (res) {
      this.WoredaList = res;
    } else {
        console.log('Error');
    }
  }, (err) => {
    console.log(err)
  }
  );
}

woredaSelecting(event:Event) {
  this.finalWoredaList =[];
    this.WoredaList.forEach((wer:any) =>{ 
      if(wer.zoneId == event)
      {
         this.finalWoredaList.push(wer);
      }
      });
  }
//kebelle

GetKebelle() {
  this.service.getKebelles().subscribe((res) => {
    if (res) {
      this.KebelleList = res;
    } else {
        console.log('Error');
    }
  }, (err) => {
    console.log(err)
  }
  );
}

kebelleSelecting(event:Event)
{
  this.finalKebelleList =[];
    this.KebelleList.forEach((keb:any) =>{ 
      if(keb.woredaId == event)
      {
         this.finalKebelleList.push(keb);
      }
      });
}


UpdateEmployee(data:any){

    this.service.editEmployee(data).subscribe((result)=>{
      if(result) {
        this.toastr.success('Employee updated successfully')
        this.dialogRef.close();
      }else{
        this.toastr.error(result['statusMessage'])
      }
    },(err)=>{

    this.toastr.error(err);
  })
  }
}

