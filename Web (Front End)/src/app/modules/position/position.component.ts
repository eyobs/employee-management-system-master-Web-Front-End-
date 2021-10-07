import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Position } from 'src/app/models/position';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  position:Position = new Position();
  Eposition:any;
  PositionList:any;
  displayedColumns: string[] = ['PositionName', 'Edit', 'Delete'];
  dataSource:any;
  form:FormGroup;
  editing = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetPostionList();
    this.form = new FormGroup({
      name: new FormControl(this.position.PositionName, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }

  saveData() {
    this.service.createPosition(this.position).subscribe((res) => {
      if (res) {
     this.toastr.success('Position saved suceesfully');
       this.GetPostionList();
              }
      else {
        console.log(this.position);
      }
    }, (err) => {
     // this.toastr.error(err);
     console.log(err)
    });
  }

  GetPostionList() {
    this.service.getPosition().subscribe((res) => {
      if (res) {
        console.log(res)
        this.PositionList = res;
        this.dataSource = new MatTableDataSource(this.PositionList);
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

  editingPosition(nation: any) {
    this.editing = true;
    this.Eposition = nation;
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  UpdatePosition(updated:any) 
  {
    console.log(updated);
    this.service.editPosition(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Position updated successfully');
        this.GetPostionList();
      }
    }))
  }

  deletePosition(posId: any){
    console.log(posId);
  this.service.deletePosition(posId).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Position deleted successfully');
      this.GetPostionList();
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
