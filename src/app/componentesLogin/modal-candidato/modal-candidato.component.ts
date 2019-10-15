import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-candidato',
  templateUrl: './modal-candidato.component.html',
  styleUrls: ['./modal-candidato.component.css']
})
export class ModalCandidatoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalCandidatoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
