import { Contact, ContactPayload } from 'src/api/contact.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { RestService } from './rest.service';
import { catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactsBackend = "/api/contacts/"

  constructor(private http: HttpClient, private restService: RestService) { }
  
  retrieveContact(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(
      this.contactsBackend.concat(contactId.toString(), "/"),
      this.restService.defaultHeaders()
    ).pipe(
      catchError(this.restService.handleError)
    );
  }
  
  createContact(payload: ContactPayload): Observable<Contact> {
    return this.http.post<Contact>(
      this.contactsBackend,
      payload,
      this.restService.defaultHeaders()
    ).pipe(
      catchError(this.restService.handleError)
      )
    }
  
  updateContact(payload: Contact): Observable<Contact> {
    return this.http.put<Contact>(
      this.contactsBackend.concat(payload.id.toString(), "/"),
      payload, 
      this.restService.defaultHeaders()
    ).pipe(
      catchError(this.restService.handleError)
      )
    }
 
  deleteContact(contactId: number): Observable<Contact> {
    return this.http.delete<Contact>(
      this.contactsBackend.concat(contactId.toString(), "/"),
      this.restService.defaultHeaders()
    ).pipe(
      catchError(this.restService.handleError)
      )
    }
}
