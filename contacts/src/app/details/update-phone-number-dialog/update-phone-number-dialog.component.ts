import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
} from "@angular/material/dialog";
import { UpdateNameDialogComponent } from "../update-name-dialog/update-name-dialog.component";

@Component({
  selector: 'app-update-phone-number-dialog',
  templateUrl: './update-phone-number-dialog.component.html',
  styleUrls: ['./update-phone-number-dialog.component.scss']
})
export class UpdatePhoneNumberDialogComponent implements OnInit {

    phoneNumber = new FormControl("", Validators.pattern('[- +()0-9]+'));

    constructor(
        private dialogRef: MatDialogRef<UpdateNameDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
          phoneNumber: string
        }
    ) {
      this.phoneNumber.setValue(data.phoneNumber)
    }

    ngOnInit(): void {}

    onSubmit(): void {
        this.data.phoneNumber = this.phoneNumber.value
        this.dialogRef.close(this.data);
    }
  }