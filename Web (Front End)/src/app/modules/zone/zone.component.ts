import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Region } from 'src/app/models/region';
import { Zone } from 'src/app/models/zone';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  region:Region = new Region();
  RegionList:any
  zone:Zone = new Zone();
  Ezone:any;
  ZoneList:any;
  displayedColumns: string[] = ['RegionName','ZoneName', 'Edit', 'Delete'];
  dataSource:any;
  form:FormGroup;
  editing = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetRegionList();
    this.GetZoneList();
    this.form = new FormGroup({
      name: new FormControl(this.zone.ZoneName, [
        Validators.required,
      ])
    });
    this.form = new FormGroup({
      id: new FormControl(this.zone.RegionId, [
        Validators.required,
      ])
    });
  }

  //Getting Regions
  GetRegionList() {
    this.service.getRegions().subscribe((data :any) => {
      if (data) {
        console.log(data)
       this.RegionList = data;
     //  let zoneId = this.RegionList.regionId;
      } else {
          console.log('Error');
      }
    }, (err) => {
      console.log(err)
    }
    );
  }
  GetZoneList() {   
   this.service.getZone().subscribe((res) => {
    if (res) {
      this.ZoneList = res;
      this.dataSource = new MatTableDataSource(this.ZoneList);
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
    console.log(this.zone);
    this.service.createZone(this.zone).subscribe((res) => {
      console.log(res)
      if (res) {
     this.toastr.success('Zone saved suceesfully');
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



  editingZone(reg: any) {
    this.editing = true;
    this.Ezone = reg;
    console.log(this.Ezone)
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  updateZone(updated:any) 
  {
    console.log(updated);
    this.service.editZone(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Zone updated successfully');
        this.GetZoneList();
        this.GetRegionList();
      }
    }))
  }

  deleteZone(zonId: any){
    console.log(zonId);
  this.service.deleteZone(zonId).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Zone deleted successfully');
      this.GetZoneList();
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
