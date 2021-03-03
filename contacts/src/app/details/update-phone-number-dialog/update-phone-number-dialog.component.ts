import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
    selector: "app-update-phone-number-dialog",
    templateUrl: "./update-phone-number-dialog.component.html",
    styleUrls: ["./update-phone-number-dialog.component.scss"],
})
export class UpdatePhoneNumberDialogComponent implements OnInit {
  phoneNumber = new FormControl();
  
  constructor(
        private dialogRef: MatDialogRef<UpdatePhoneNumberDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {phoneNumber: (string | null)}
    ) {
      this.phoneNumber.setValue(data.phoneNumber)
    }

    ngOnInit(): void {}

    onSubmit(): void {
      this.data.phoneNumber = this.phoneNumber.value
      this.dialogRef.close(this.data);
    }
}
