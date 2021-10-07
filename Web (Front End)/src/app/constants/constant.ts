import { HttpHeaders } from "@angular/common/http";

export const RESPONSE_STATUS_SUCCESS = 0;

export const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }