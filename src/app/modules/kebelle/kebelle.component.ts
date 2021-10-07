import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Kebelle } from 'src/app/models/kebelle';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-kebelle',
  templateUrl: './kebelle.component.html',
  styleUrls: ['./kebelle.component.scss']
})
export class KebelleComponent implements OnInit {
  kebelle:Kebelle = new Kebelle();
  WoredaList:any
  EKebelle:any;
  kebelleList:any;
  displayedColumns: string[] = ['WoredaId','KebelleName', 'Edit', 'Delete'];
  dataSource:any;
  form:FormGroup;
  editing = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListKebelles();
    this.GetWoredaList();
    this.form = new FormGroup({
      name: new FormControl(this.kebelle.KebelleName, [
        Validators.required,
        //Validators.minLength(4),
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])
    });
  }
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
  saveData() {
    console.log(this.kebelle);
    this.service.createKebelle(this.kebelle).subscribe((res) => {
      if (res) {
     this.toastr.success('Kebelle saved suceesfully');
       this.GetListKebelles();
              }
      else {
        console.log(this.kebelle);
      }
    }, (err) => {
     // this.toastr.error(err);
     console.log(err)
    });
  }

  GetListKebelles() {
    this.service.getKebelles().subscribe((res) => {
      if (res) {
        this.kebelleList = res;
        console.log('kebelle list')
        console.log(this.kebelleList);
        this.dataSource = new MatTableDataSource(this.kebelleList);
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

  editingKebelle(KebelleRes: any) {
    this.editing = true;
    this.EKebelle = KebelleRes;
  }
  cancelEditing()
  { 
    this.editing = false;
  }

  updateKebelle(updated:any) 
  {
    this.service.editKebelle(updated).subscribe((res=>{
      if(res)
      { 
        this.toastr.success('Kebelle updated successfully');
        this.GetListKebelles();
      }
    }))
  }

  deleteKebelle(kebId: any){
    console.log(kebId);
  this.service.deleteKebelle(kebId).subscribe((res=>{
    if(res)
    { 
      this.toastr.success('Kebelle deleted successfully');
      this.GetListKebelles();
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
