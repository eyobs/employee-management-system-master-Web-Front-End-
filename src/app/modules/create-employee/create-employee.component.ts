import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { Kebelle } from 'src/app/models/kebelle';
import { Region } from 'src/app/models/region';
import { Woreda } from 'src/app/models/woreda';
import { Zone } from 'src/app/models/zone';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  form:FormGroup;
  employee:Employee = new Employee;
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
  
  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetPostions();
    this.GetReligions();
    this.GetEducaitonalLevels();
    this.GetNationality();
    this.GetRegionList();
    this.GetZoneList();
    this.GetWoredaList();
    this.GetKebelle();

    this.form = new FormGroup({
      name: new FormControl(this.employee, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }
  saveData(data:any) {
    console.log('this is the sent data')
    console.log(data);
    this.service.createEmployee(data).subscribe((res) => {
      if (res) {
     this.toastr.success('Employee saved suceesfully');
              }
      else {
        console.log(this.employee);
      }
    }, (err) => {
      this.toastr.error(err);
     console.log(err)
    });
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
  }, (err) => {
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
}
