import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as CryptoJS from 'crypto-js';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-dialogo-urna',
  templateUrl: './dialogo-urna.component.html',
  styleUrls: ['./dialogo-urna.component.css'],
})
export class DialogoUrnaComponent implements OnInit {
  formulario: FormGroup;
  resultadoEncriptacao: string;

  constructor(
    public dialogRef: MatDialogRef<DialogoUrnaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DadosUrna, private snackBar: MatSnackBar, private authenticationService: AuthenticationService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  validarUrna() {
    if (this.data.Apelido !== '' && this.data.Apelido !== undefined && this.data.Senha !== '' && this.data.Senha !== undefined) {
      this.resultadoEncriptacao = CryptoJS.SHA256(this.data.Senha).toString();
      const formData: FormData = new FormData();
      formData.append('Apelido', this.data.Apelido);
      formData.append('Senha', this.resultadoEncriptacao);
      this.authenticationService.loginUrna(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          localStorage.setItem('Urna', JSON.stringify(data));
          this.dialogRef.close('oi');
        },
        (error) => {
          this.snackBar.open('Dados da Urna não encontrados ou a mesma já está sendo usada', 'Fechar', {
            duration: 2000,
          });
        });
    } else {
      this.snackBar.open('Por favor preencha os campos', 'Fechar', {
        duration: 2000,
      });
    }
  }

}

export interface DadosUrna {
  Apelido: string;
  Senha: string;
}
