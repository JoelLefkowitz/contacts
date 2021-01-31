import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
    selector: "app-update-name-dialog",
    templateUrl: "./update-name-dialog.component.html",
    styleUrls: ["./update-name-dialog.component.scss"],
})
export class UpdateNameDialogComponent implements OnInit {
  contactName = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
  });  

    constructor(
        private dialogRef: MatDialogRef<UpdateNameDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {firstName: string, lastName: string}
    ) {
      this.contactName.setValue({
        firstName : data.firstName,
        lastName : data.lastName
      })
    }

    ngOnInit(): void {}

    onSubmit(): void {
        this.data.firstName = this.contactName.value.firstName
        this.data.lastName = this.contactName.value.lastName
        this.dialogRef.close(this.data);
    }
}
