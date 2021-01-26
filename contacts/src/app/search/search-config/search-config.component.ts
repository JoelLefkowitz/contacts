import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SearchConfig, SortOption } from "src/api/search.model";

import { Subscription } from "rxjs";

@Component({
  selector: 'app-search-config',
  templateUrl: './search-config.component.html',
  styleUrls: ['./search-config.component.scss']
})
export class SearchConfigComponent implements OnInit, OnDestroy {

  sortOptions = Object.values(SortOption);

  searchConfig = new FormGroup({
    sortBy: new FormControl(),  
    exactMatch: new FormControl()
  });
  
  formSubscription : Subscription;
  @Output() searchConfigUpdate = new EventEmitter<SearchConfig>();

  constructor() {}

  ngOnInit(): void {
      this.searchConfig.setValue({
        sortBy: SortOption.firstName,
        exactMatch: false,
      });
      
      this.formSubscription = this.searchConfig.valueChanges.subscribe(
        (value: SearchConfig) => {
        this.searchConfigUpdate.emit(value);
      });
  }
  
  ngOnDestroy(): void {
    if(this.formSubscription){ this.formSubscription.unsubscribe()}
  }
  
}
