import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Woreda } from 'src/app/models/woreda';
import { Zone } from 'src/app/models/zone';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-woreda',
  templateUrl: './woreda.component.html',
  styleUrls: ['./woreda.component.scss']
})
export class WoredaComponent implements OnInit {
  woreda:Woreda = new Woreda();
  WoredaList :any
  ZoneList:any
  Eworeda:any;
  displayedColumns: string[] = ['ZoneId','WoredaName', 'Edit', 'Delete'];
  dataSource:any;
  form:FormGroup;
  editing = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetZoneList();
    this.GetWoredaList();
    this.form = new FormGroup({
      name: new FormControl(this.woreda.WoredaName, [
        Validators.required,
      ])
    });
    this.form = new FormGroup({
      id: new FormControl(this.woreda.ZoneId, [
        Validators.required,
      ])
    });
  }

  //Getting Regions
  GetZoneList() {
    this.service.getZone().subscribe((data :any) => {
      if (data) {
        console.log(data)
       this.ZoneList = data;
      } else {
          console.log('Error');
      }
    }, (err) => {
      console.log(err)
    }
    );
  }
  GetWoredaList() {   
   this.service.getWoreda().subscribe((res) => {
    if (res) {
      this.WoredaList = res;
      console.log('woreda')
      console.log(this.WoredaList);
      this.dataSource = new MatTableDataSource(this.WoredaList);
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
  saveData() {
    console.log(this.woreda);
    this.service.createWoreda(this.woreda).subscribe((res) => {
      console.log(res)
      if (res) {
     this.toastr.success('Woreda saved suceesfully');
       this.GetWoredaList();
              }
      else {
        console.log('Error');
      }
    }, (err) => {
     // this.toastr.error(err);
     console.log(err)
    });
  }

  editingWoreda(reg: any) {
    this.editing = true;
    this.Eworeda = reg;
    console.log(this.Eworeda)
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  updateWoreda(updated:any) 
  {
    console.log('sent data')
    console.log(updated);
    this.service.editWoreda(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Woreda updated successfully');
        this.GetWoredaList();
      }
    }))
  }

  deleteWoreda(werId: any){
    console.log(werId);
  this.service.deleteWoreda(werId).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Woreda deleted successfully');
      this.GetWoredaList();
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
