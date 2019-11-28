import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as CryptoJS from 'crypto-js';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Validacoes } from '../login/validacoes';

@Component({
  selector: 'app-dialogo-urna',
  templateUrl: './dialogo-urna.component.html',
  styleUrls: ['./dialogo-urna.component.css'],
})
export class DialogoUrnaComponent implements OnInit {
  // formulario: FormGroup;
  resultadoEncriptacao: string;
  Apelido: string;
  Senha: string;
  loginForm;
  loginFormUrna;
  get formularioPessoa() { return this.loginForm.controls; }
  get formularioUrna() { return this.loginFormUrna.controls; }

  constructor(
    public dialogRef: MatDialogRef<DialogoUrnaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DadosUrna, private snackBar: MatSnackBar, private authenticationService: AuthenticationService, private formulario: FormBuilder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.loginForm = this.formulario.group({
      CPF: ['', Validators.compose([Validators.required, Validators.minLength(11), Validacoes])],
      Senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
    this.loginFormUrna = this.formulario.group({
      Apelido: ['', Validators.compose([Validators.required])],
      SenhaUrna: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  validarUrna() {
      this.resultadoEncriptacao = CryptoJS.SHA256(this.formularioUrna.SenhaUrna.value).toString();
      const formData: FormData = new FormData();
      formData.append('Apelido', this.formularioUrna.Apelido.value);
      formData.append('Senha', this.resultadoEncriptacao);
      this.authenticationService.loginUrna(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          localStorage.setItem('Urna', JSON.stringify(data));
          this.dialogRef.close('oi');
        },
        (error) => {
          console.log(error);
          this.snackBar.open('Dados da Urna não encontrados ou a mesma já está sendo usada', 'Fechar', {
            duration: 2000,
          });
        });
  }

  validarPessoa() {
      this.resultadoEncriptacao = CryptoJS.SHA256(this.formularioPessoa.Senha.value).toString();
      const formData: FormData = new FormData();
      formData.append('CPF', this.formularioPessoa.CPF.value);
      formData.append('Senha', this.resultadoEncriptacao);
      // console.log(this.formularioPessoa.CPF);
      // this.authenticationService.loginUrna(formData)
      // .pipe(first())
      // .subscribe(
      //   (data) => {
      //     localStorage.setItem('Urna', JSON.stringify(data));
      //     this.dialogRef.close('oi');
      //   },
      //   (error) => {
      //     this.snackBar.open('Dados da Urna não encontrados ou a mesma já está sendo usada', 'Fechar', {
      //       duration: 2000,
      //     });
      //   });
  }

}

export interface DadosUrna {
  Apelido: string;
  Senha: string;
}
