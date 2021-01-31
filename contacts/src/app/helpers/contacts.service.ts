import { Contact, ContactPayload } from 'src/api/contact.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mockContact, mockPaginatedContacts } from 'src/api/mocks';

import { Injectable } from '@angular/core';
import { Paginated } from 'src/api/paginator.model';
import { RestService } from './rest.service';
import { SearchConfig } from 'src/api/search.model';
import { catchError, } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactsBackend = environment.apiHost.concat("api/contacts/")

  constructor(private http: HttpClient, private restService: RestService) { }
  
  searchContacts(searchInput: string, searchConfig: SearchConfig, limit?: number, offset?: number): Observable<Paginated<Contact>> {
    return of(mockPaginatedContacts);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: new HttpParams()
      .set('searchInput', searchInput)
      .set('sortBy', searchConfig.sortBy)
      .set('exactMatch', JSON.stringify(searchConfig.exactMatch))
    };

    return this.http.get<Paginated<Contact>>(
      this.contactsBackend.concat(this.restService.paginationBuilder(limit, offset)), httpOptions
    ).pipe(
      catchError(this.restService.handleError)
    )
  }

  retrieveContact(id: number): Observable<Contact> {
    return of(mockContact);
    
    return this.http.get<Contact>(
      this.contactsBackend.concat(id.toString(), "/"),
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
  
  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(
      this.contactsBackend.concat(contact.id.toString(), "/"),
      contact,
      this.restService.defaultHeaders()
    ).pipe(
      catchError(this.restService.handleError)
      )
    }
 
  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(
      this.contactsBackend.concat(id.toString(), "/"),
      this.restService.defaultHeaders()
    ).pipe(
      catchError(this.restService.handleError)
      )
    }
}

