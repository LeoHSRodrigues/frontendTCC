import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MustMatch } from 'src/app/componentesSemLogin/registro/validacoes';
import * as uuid from 'uuid';

@Component({
  selector: 'app-form-gestao-urna-novo',
  templateUrl: './form-gestao-urna-novo.component.html',
  styleUrls: ['./form-gestao-urna-novo.component.css'],
})
export class FormGestaoUrnaNovoComponent implements OnInit {
  formulario: FormGroup;
  resultadoEncriptacao: any;
  valorDigital: any;
  stepper: any;
  connection: any;
  get f() { return this.formulario.controls; }
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Apelido: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', Validators.required],
      valorDigital: [''],
    }, {
      validator: MustMatch('senha', 'confirmaSenha'),
    });
  }
  voltar(event) {
    event.preventDefault();
    this.router.navigate(['gestaoUrna']);
  }

  onSubmit(formulario) {
    if (this.formulario.invalid) {
      return;
    }
    this.resultadoEncriptacao = CryptoJS.SHA256(formulario.senha).toString();
    const formData: FormData = new FormData();
    formData.append('Apelido', formulario.Apelido);
    formData.append('Senha', this.resultadoEncriptacao);
    this.authenticationService.cadastroUrna(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data === 'cadastrado') {
            localStorage.setItem('mensagem', formulario.Apelido + ' cadastrado(a) com sucesso!');
            this.router.navigate(['gestaoUrna']);
          }
        },
        (error) => {
          this.snackBar.open('Urna com apelido já cadastrado', 'Fechar', {
            duration: 2000,
          });
        });
  }
}
