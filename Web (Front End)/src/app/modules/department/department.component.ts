import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
department:Department = new Department();
Edepartment:any;
departmentList:any;
displayedColumns: string[] = ['DepartmentID', 'DepartmentName', 'Edit', 'Delete'];
dataSource:any;
form:FormGroup;
editing = false;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
  constructor(private service:EmployeeService, private toastr:ToastrService) { }
//private service:EmployeeService
  ngOnInit(): void {
    this.GetListDepartment();
    this.form = new FormGroup({
      name: new FormControl(this.department.DepartmentName, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }

  saveData() {
    this.service.createDepartment(this.department).subscribe((res) => {
      if (res) {
     this.toastr.success('Department saved suceesfully');
       this.GetListDepartment();
              }
      else {
        console.log(this.department);
      }
    }, (err) => {
     // this.toastr.error(err);
     console.log(err)
    });
  }

  GetListDepartment() {
    this.service.getDepartments().subscribe((res) => {
      if (res) {
        this.departmentList = res;
        this.dataSource = new MatTableDataSource(this.departmentList);
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

  editingDepartment(department: any) {
    this.editing = true;
    this.Edepartment = department;
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  UpdateDepartment(updated:any) 
  {
    this.service.editDepartment(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Department updated successfully');
        this.GetListDepartment();
      }
    }))
  }

  deleteDepartment(deptID: any){
    console.log(deptID);
  this.service.deleteDepartment(deptID).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Department deleted successfully');
      this.GetListDepartment();
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
