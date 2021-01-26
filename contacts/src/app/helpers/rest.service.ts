import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService { 
  
  constructor() { }
  
  defaultHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })}
  }
  
  handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Returned code ${error.status}, ` +
          `Body: ${error.error}`);
      }
      return throwError(
        'Cannot access backend resources, please try again later'
        );
    }

    paginationBuilder(limit?: number, offset?: number): string {
      if (limit && offset) {
          return `?limit=${limit}&offset=${offset}`;
      }

      if (limit) {
          return `?limit=${limit}`;
      }

      if (offset) {
          return `?offset=${offset}`;
      }

      return "";
  }
}
