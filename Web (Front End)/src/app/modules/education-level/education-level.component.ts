import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EducationalLevel } from 'src/app/models/educationLevel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-education-level',
  templateUrl: './education-level.component.html',
  styleUrls: ['./education-level.component.scss']
})
export class EducationLevelComponent implements OnInit {
eLevel:EducationalLevel = new EducationalLevel();
ELevel:any;
eLevelList:any;
displayedColumns: string[] = ['EducaitonalLevelName', 'Edit', 'Delete'];
dataSource:any;
form:FormGroup;
editing = false;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListEducationalLevel();
    this.form = new FormGroup({
      name: new FormControl(this.eLevel.EducationLevelName, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }

  saveEducationalLEvel() {
    console.log(this.eLevel)
    this.service.createEducationalLevel(this.eLevel).subscribe((res) => {
      if (res) {
      console.log(res);
     this.toastr.success('Educational saved suceesfully');
       this.GetListEducationalLevel();
              }
      else {
        console.log(this.eLevel);
      }
    }, (err) => {
     // this.toastr.error(err);
     console.log(err)
    });
  }

  GetListEducationalLevel() {
    this.service.getEducationalLevel().subscribe((res) => {
      if (res) {
        console.log("this is list of education level")
        console.log(res)
        this.eLevelList = res;
        console.log(this.eLevelList);
        this.dataSource = new MatTableDataSource(this.eLevelList);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
      } else {
          console.log('Error');
      }
    }, (err) => {
      console.log(err)
    }
    );
  }

  editingEducationalLevel(department: any) {
    this.editing = true;
    this.ELevel = department;
    console.log(this.ELevel);
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  UpdateEducationalLevel(updated:any) 
  {
    this.service.editEducaionalLevel(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Educational level updated successfully');
        this.GetListEducationalLevel();
      }
    }))
  }

  deleteEducationalLevel(eduId: any){
    console.log(eduId);
  this.service.deleteEducationalLevel(eduId).subscribe((res=>{
    console.log(res);
    if(res)
    { 
      this.toastr.success('Eduactional level deleted successfully');
      this.GetListEducationalLevel();
    }
  }))
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
