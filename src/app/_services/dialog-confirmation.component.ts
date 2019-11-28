import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confirmation-dialog',
  template: '<div mat-dialog-content>{{message}}</div><div mat-dialog-actions><button mat-button (click)="onNoClick()">Não</button><button mat-button [mat-dialog-close]="true" cdkFocusInitial>Sim</button></div>',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}