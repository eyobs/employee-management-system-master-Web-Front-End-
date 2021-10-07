import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Religion } from 'src/app/models/religion';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit {
  religion:Religion = new Religion();
  Ereligion:any;
  ReligionsList:any;
  displayedColumns: string[] = ['Religion', 'Edit', 'Delete'];
  dataSource:any;
  form:FormGroup;
  editing = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetReligionList();
    this.form = new FormGroup({
      name: new FormControl(this.religion.ReligionName, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }

  saveData() {
    console.log(this.religion);
    this.service.createReligion(this.religion).subscribe((res) => {
      console.log(res)
      if (res) {
     this.toastr.success('Religion saved suceesfully');
       this.GetReligionList();
              }
      else {
        console.log(this.religion);
      }
    }, (err) => {
     // this.toastr.error(err);
     console.log(err)
    });
  }

  GetReligionList() {
    this.service.getReligion().subscribe((res) => {
      if (res) {
        console.log(res)
        this.ReligionsList = res;
        this.dataSource = new MatTableDataSource(this.ReligionsList);
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

  editingReligion(reli: any) {
    this.editing = true;
    this.Ereligion = reli;
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  UpdateReligion(updated:any) 
  {
    console.log(updated);
    this.service.editReligion(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Religion updated successfully');
        this.GetReligionList();
      }
    }))
  }

  deleteReligion(reliId: any){
    console.log(reliId);
  this.service.deleteReligion(reliId).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Religion deleted successfully');
      this.GetReligionList();
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
