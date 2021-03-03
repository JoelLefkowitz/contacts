import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Paginated, PaginatorConfig, defaultPaginatorConfig } from 'src/api/paginator.model';
import { SearchConfig, defaultSearchConfig } from 'src/api/search.model';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { Contact } from 'src/api/contact.model';
import { ContactsService } from 'src/app/helpers/contacts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private searchInput = new BehaviorSubject<string>("");
  private searchConfig = new BehaviorSubject<SearchConfig>(defaultSearchConfig);
  private paginatorConfig = new BehaviorSubject<PaginatorConfig>(defaultPaginatorConfig);
  
  searchResults: Observable<Paginated<Contact>>

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.searchResults = combineLatest([
        this.searchInput.asObservable(),
        this.searchConfig.asObservable(),
        this.paginatorConfig.asObservable()
      ])
      .pipe(
      debounceTime(50),
      switchMap(
        ([searchInput, searchConfig, paginatorConfig]) => {
          const limit = paginatorConfig ? paginatorConfig.pageSize : null;
          const offset = paginatorConfig ? limit * paginatorConfig.pageIndex : null;
          return this.contactsService.searchContacts(searchInput, searchConfig, limit, offset)
        }
      )
    )
  }

  searchInputUpdate(searchInput: string) {
    this.searchInput.next(searchInput)
  }
  
  searchConfigUpdate(searchConfig: SearchConfig) {
    this.searchConfig.next(searchConfig)
  }

  paginatorConfigUpdate(paginatorConfig: PaginatorConfig) {
    this.paginatorConfig.next(paginatorConfig)
  }

}
