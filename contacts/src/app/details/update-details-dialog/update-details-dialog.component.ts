import {
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: 'app-update-details-dialog',
  templateUrl: './update-details-dialog.component.html',
  styleUrls: ['./update-details-dialog.component.scss']
})
export class UpdateDetailsDialogComponent implements OnInit {

  firstName = new FormControl();
  lastName = new FormControl();
  newIcon = new FormControl();

  constructor(
      private dialogRef: MatDialogRef<UpdateDetailsDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
         firstName: string,
         lastName: string,
         newIcon: File | null
       }
  ) {
      this.firstName.setValue(data.firstName);
      this.lastName.setValue(data.lastName);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.data.firstName = this.firstName.value,
    this.data.lastName = this.lastName.value,
    this.data.newIcon = this.newIcon.value ? this.newIcon.value : null
    this.dialogRef.close(this.data);
  }
}
