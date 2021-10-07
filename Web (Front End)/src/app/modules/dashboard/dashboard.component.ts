import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
employee:Employee = new Employee;
EditEmployee:any;
EmployeeList:any;

displayedColumns: string[] = ['unitId','firstName','fatherName','grandName','religion','birthDate','birthPlace','meritialStatusId','nationalityId','regionId','zoneId',
'woredaId','kebeleId','email','telMobile','telHome','roomNo','educationLevel','educationField','positionId', 'Edit', 'Delete'];
//'telOffDirect1','salary','empDate','empLetter','empStatus','currentStatus','terminationDate','terminationReason','terminationLetter'
dataSource:any;
form:FormGroup;
editing = false;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
  constructor(private toastr:ToastrService, private service:EmployeeService,private dialog:MatDialog) { }

  ngOnInit(): void {
   this.GetEmployeeList();
    this.form = new FormGroup({
      name: new FormControl(this.employee.firstName, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }

  GetEmployeeList() 
  {
  this.service.getEmployee().subscribe((res) => {
    if (res) {
      this.EmployeeList = res;
      console.log(this.EmployeeList);
      this.dataSource = new MatTableDataSource(this.EmployeeList);
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

  editEmployee(event:any){
    const moveDialog = this.dialog.open(EditEmployeeComponent,{
     data:event
    });
    }
  

  deleteEmployee(empId: any){
    console.log(empId);
  this.service.deleteEmployee(empId).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Employee deleted successfully');
      this.GetEmployeeList();
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
