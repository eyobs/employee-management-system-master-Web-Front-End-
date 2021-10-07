import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { EducationalLevel } from '../models/educationLevel';
import { Employee } from '../models/employee';
import { Kebelle } from '../models/kebelle';
import { Nationality } from '../models/nationality';
import { Position } from '../models/position';
import { Region } from '../models/region';
import { Religion } from '../models/religion';
import { Woreda } from '../models/woreda';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor( private http: HttpClient) { }
  //Application url
  readonly departmentUrl = 'http://localhost:24813/api/Department';
  readonly  educationUrl = 'http://localhost:24813/api/EducationLevel';
  readonly  employeeUrl = 'http://localhost:24813/api/Employee';
  readonly  kebelleUrl = 'http://localhost:24813/api/Kebelle';
  readonly  nationalityUrl = 'http://localhost:24813/api/Nationality';
  readonly  positionUrl = 'http://localhost:24813/api/Position';
  readonly  regionUrl = 'http://localhost:24813/api/Region';
  readonly  religionUrl = 'http://localhost:24813/api/Religion';
  readonly  woredaUrl = 'http://localhost:24813/api/Woreda';
  readonly  zoneUrl = 'http://localhost:24813/api/Zonesontroller';


  //Employee URL
  createEmployee(employee: Employee) {
    return this.http.post(this.employeeUrl, employee) //JSON.stringify(department
  }
  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl)
  }
  deleteEmployee(id: any) {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.delete(url)
  }
  editEmployee(emp: any) {
    let body: any = {}
    body.staffId = emp.staffId 
    body.unitId  = emp.unitId
    body.firstName =emp.firstName;
    body.fatherName = emp.fatherName;
    body.grandName =emp.fatherName;
    body.sex  = emp.sex;
    body.religion = emp.religion;
    body.birthDate = emp.birthDate ;
    body.birthPlace =emp.birthPlace;
    body.meritialStatusId = emp.meritialStatusId;
    body.nationalityId = emp.nationalityId;
    body.regionId = emp.regionId;
    body.zoneId = emp.zoneId;
    body.woredaId = emp.woredaId;
    body.kebeleId = emp.kebeleId;
    body.email  = emp.email;
    body.telMobile  = emp.telMobile;
    body.telHome = emp.telHome ;
    body.telOffDirect1 = emp.telOffDirect1;
    body.telOffDirect2 = emp.telOffDirect2 ;
    body.telOffExt1  =emp.telOffExt1;
    body.roomNo = emp.roomNo;
    body.educationLevel = emp.educationLevel;
    body.educationField  = emp.educationField;
    body.positionId = emp.positionId;
    body.salary = emp.salary;
    body.empDate = emp.empDate;
    body.empLetter =emp.empLetter;
    body.empStatus = emp.empStatus;
    body.currentStatus = emp.currentStatus;
    body.terminationDate = emp.terminationDate;
    body.terminationReason  = emp.terminationReason;
    body.terminationLetter = emp.terminationLetter ;
    body.photo = emp.photo; 
    const empId = emp.staffId
    const editUrl = `${this.employeeUrl}/${empId}`;
    return this.http.put(editUrl, body)
  }

  //Department Url
  createDepartment(DepartmentDTO: Department) {
    return this.http.post(this.departmentUrl, DepartmentDTO) //JSON.stringify(department
  }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentUrl)
  }
  deleteDepartment(id: any) {
    const url = `${this.departmentUrl}/${id}`;
    return this.http.delete(url)
  }
  editDepartment(dept: any) {
    let body: any = {}
    body.DepartmentName = dept.departmentName
    body.DepartmentId = dept.departmentId
    const DeptId = dept.departmentId
    const editUrl = `${this.departmentUrl}/${DeptId}`;
    return this.http.put(editUrl, body)
  }

  //Education level CRUD methods
  createEducationalLevel(levelDTO: EducationalLevel) {
    return this.http.post(this.educationUrl, levelDTO) //JSON.stringify(department
  }
  getEducationalLevel(): Observable<EducationalLevel[]> {
    return this.http.get<EducationalLevel[]>(this.educationUrl)
  }
  deleteEducationalLevel(id: any) {
    const url = `${this.educationUrl}/${id}`;
    return this.http.delete(url)
  }
  editEducaionalLevel(level: any) {
    let body: any = {};
    body.EducationLevelName = level.educationLevelName;
    body.EducationLevelId = level.educationLevelId;
    const levelId = level.educationLevelId;
    const editUrl = `${this.educationUrl}/${levelId}`;
    return this.http.put(editUrl, body);
  }

//Naionality CRUD
createNationality(nationa: Nationality) {
  return this.http.post(this.nationalityUrl, nationa) //JSON.stringify(department
}
getNationality(): Observable<Nationality[]> {
  return this.http.get<Nationality[]>(this.nationalityUrl)
}
deleteNationality(id: any) {
  const url = `${this.nationalityUrl}/${id}`;
  return this.http.delete(url)
}
editNationality(level: any) {
  let body: any = {};
  body.NationalityName = level.nationalityName;
  body.NationalityId = level.nationalityId;
  const levelId = level.nationalityId;
  const editUrl = `${this.nationalityUrl}/${levelId}`;
  return this.http.put(editUrl, body);
}

//Position CRUD
createPosition(pos: Position) {
  return this.http.post(this.positionUrl, pos) //JSON.stringify(department
}
getPosition(): Observable<Position[]> {
  return this.http.get<Position[]>(this.positionUrl)
}
deletePosition(id: any) {
  const url = `${this.positionUrl}/${id}`;
  return this.http.delete(url)
}
editPosition(pos: any) {
  let body: any = {};
  body.PositionName = pos.positionName;
  body.PositionId = pos.positionId;
  const posId = pos.positionId;
  const editUrl = `${this.positionUrl}/${posId}`;
  return this.http.put(editUrl, body);
}

//Religion CRUD
createReligion(rel: Religion) {
  return this.http.post(this.religionUrl, rel) //JSON.stringify(department
}
getReligion(): Observable<Religion[]> {
  return this.http.get<Religion[]>(this.religionUrl)
}
deleteReligion(id: any) {
  const url = `${this.religionUrl}/${id}`;
  return this.http.delete(url)
}
editReligion(rel: any) {
  let body: any = {};
  body.ReligionName = rel.religionName;
  body.ReligionId = rel.religionId;
  const relId = rel.religionId;
  const editUrl = `${this.religionUrl}/${relId}`;
  return this.http.put(editUrl, body);
}


//Region CRUD
createRegion(reg: Region) {
  return this.http.post(this.regionUrl, reg); //JSON.stringify(department
}

getRegions(): Observable<Region[]> {
  return this.http.get<Region[]>(this.regionUrl)
}

deleteRegion(id: any) {
  const url = `${this.regionUrl}/${id}`;
  return this.http.delete(url)
}

editRegion(reg: any) {
  let body: any = {};
  body.RegionId = reg.regionId;
  body.RegionName = reg.regionName;
  const regId = reg.regionId;
  const editUrl = `${this.regionUrl}/${regId}`;
  return this.http.put(editUrl, body);
}

//Zone CRUD
createZone(zon: Zone) {
  return this.http.post(this.zoneUrl, zon); //JSON.stringify(department
}

getZone(): Observable<Zone[]> {
  return this.http.get<Zone[]>(this.zoneUrl)
}

deleteZone(id: any) {
  const url = `${this.zoneUrl}/${id}`;
  return this.http.delete(url);
}

editZone(zon: any) {
  let body: any = {};
  body.RegionId = zon.regionId;
  body.ZoneId = zon.zoneId;
  body.ZoneName = zon.zoneName;
  const zoneId = zon.zoneId;
  const editUrl = `${this.zoneUrl}/${zoneId}`;
  return this.http.put(editUrl, body);
}

//Woreda CRUD
createWoreda(wer: Woreda) {
  return this.http.post(this.woredaUrl, wer); //JSON.stringify(department
}

getWoreda(): Observable<Woreda[]> {
  return this.http.get<Woreda[]>(this.woredaUrl)
}

deleteWoreda(id: any) {
  const url = `${this.woredaUrl}/${id}`;
  return this.http.delete(url)
}

editWoreda(wor: any) {
  let body: any = {};
  body.WoredaId = wor.woredaId;
  body.ZoneId = wor.zoneId;
  body.WoredaName = wor.woredaName;
  const woreId = wor.woredaId;
  const editUrl = `${this.woredaUrl}/${woreId}`;
  return this.http.put(editUrl, body);
}

  //Kebelle CRUD
  createKebelle(kebelle: Kebelle) {
    return this.http.post(this.kebelleUrl, kebelle); //JSON.stringify(department
  }

  getKebelles(): Observable<Kebelle[]> {
    return this.http.get<Kebelle[]>(this.kebelleUrl)
  }

  deleteKebelle(id: any) {
    const url = `${this.kebelleUrl}/${id}`;
    return this.http.delete(url)
  }
  editKebelle(kebe: any) {
    let body: any = {};
    body.KebelleId = kebe.kebelleId;
    body.KebelleName = kebe.kebelleName;
    body.WoredaId = kebe.woredaId;
    const kebeId = kebe.kebelleId;
    const editUrl = `${this.kebelleUrl}/${kebeId}`;
    return this.http.put(editUrl, body);
  }


}