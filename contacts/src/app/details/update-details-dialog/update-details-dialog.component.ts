import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Contact } from "src/api/contact.model";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ContactCardComponent } from "../../home/contact-card/contact-card.component";

@Component({
    selector: "app-update-details-dialog",
    templateUrl: "./update-details-dialog.component.html",
    styleUrls: ["./update-details-dialog.component.scss"],
})
export class UpdateDetailsDialogComponent implements OnInit {
  contactBasicDetails = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    icon: new FormControl()
  });  

    constructor(
        private dialogRef: MatDialogRef<UpdateDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            contact: Contact;
        }
    ) {
        this.contactBasicDetails.value.firstName.setValue(data.contact.firstName);
        this.contactBasicDetails.value.lastName.setValue(data.contact.lastName);
    }

    ngOnInit(): void {}

    onSubmit(): void {
        this.data.contact.firstName = this.contactBasicDetails.value.firstName.value
        this.data.contact.lastName = this.contactBasicDetails.value.lastName.value
        this.dialogRef.close(this.data);
    }
}
