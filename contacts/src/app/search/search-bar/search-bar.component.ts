import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { Observable, of } from "rxjs";

@Component({
    selector: "app-search-bar",
    templateUrl: "./search-bar.component.html",
    styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
    searchInput = "";

    @Input() placeholder = "";
    @Input() showProgress: Observable<boolean> = of(false);
    
    @Output() searchInputUpdate = new EventEmitter<string>();

    inputChange(searchInput: string): void {
        this.searchInput = searchInput;
        this.searchInputUpdate.emit(searchInput);
    }

    constructor() {}

    ngOnInit(): void {}
}
