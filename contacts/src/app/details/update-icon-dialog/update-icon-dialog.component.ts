import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import {ImagePayload} from "src/api/image.model";

@Component({
  selector: 'app-update-icon-dialog',
  templateUrl: './update-icon-dialog.component.html',
  styleUrls: ['./update-icon-dialog.component.scss']
})
export class UpdateIconDialogComponent implements OnInit {
  iconUpload = new FormControl();
  
  constructor(
        private dialogRef: MatDialogRef<UpdateIconDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {imagePayload: ImagePayload | null}
    ) { }

    ngOnInit(): void {}

    onSubmit(): void {
      this.data.imagePayload = this.iconUpload.value
      this.dialogRef.close(this.data);
    }
}
