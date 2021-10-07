import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Region } from 'src/app/models/region';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  region:Region = new Region();
  Eregion:any;
  RegionList:any;
  displayedColumns: string[] = ['RegionName', 'Edit', 'Delete'];
  dataSource:any;
  form:FormGroup;
  editing = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetRegionList();
    this.form = new FormGroup({
      name: new FormControl(this.region.RegionName, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }

  saveData() {
    console.log(this.region);
    this.service.createRegion(this.region).subscribe((res) => {
      console.log(res)
      if (res) {
     this.toastr.success('Region saved suceesfully');
       this.GetRegionList();
              }
      else {
        console.log(this.region);
      }
    }, (err) => {
     // this.toastr.error(err);
     console.log(err)
    });
  }

  GetRegionList() {
    this.service.getRegions().subscribe((res) => {
      if (res) {
        console.log('list of regions');
        console.log(res)
        this.RegionList = res;
        this.dataSource = new MatTableDataSource(this.RegionList);
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

  editingRegion(reg: any) {
    this.editing = true;
    this.Eregion = reg;
    console.log(this.Eregion)
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  updateRegion(updated:any) 
  {
    console.log(updated);
    this.service.editRegion(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Region updated successfully');
        this.GetRegionList();
      }
    }))
  }

  deleteRegion(regId: any){
    console.log(regId);
  this.service.deleteRegion(regId).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Region deleted successfully');
      this.GetRegionList();
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
