import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Nationality } from 'src/app/models/nationality';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent implements OnInit {
  nation:Nationality = new Nationality();
  Enation:any;
  NationList:any;
  displayedColumns: string[] = ['NationalityName', 'Edit', 'Delete'];
  dataSource:any;
  form:FormGroup;
  editing = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetNationList();
    this.form = new FormGroup({
      name: new FormControl(this.nation.NationalityName, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }

  saveData() {
    this.service.createNationality(this.nation).subscribe((res) => {
      if (res) {
     this.toastr.success('Nationality saved suceesfully');
       this.GetNationList();
              }
      else {
        console.log(this.nation);
      }
    }, (err) => {
     // this.toastr.error(err);
     console.log(err)
    });
  }

  GetNationList() {
    this.service.getNationality().subscribe((res) => {
      if (res) {
        console.log(res)
        this.NationList = res;
        this.dataSource = new MatTableDataSource(this.NationList);
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

  editingNationality(nation: any) {
    this.editing = true;
    this.Enation = nation;
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  UpdateNationality(updated:any) 
  {
    console.log(updated);
    this.service.editNationality(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Nationality updated successfully');
        this.GetNationList();
      }
    }))
  }

  deleteNationality(nationId: any){
    console.log(nationId);
  this.service.deleteNationality(nationId).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Nationality deleted successfully');
      this.GetNationList();
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
