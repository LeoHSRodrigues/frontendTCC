import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MustMatch } from 'src/app/componentesSemLogin/registro/validacoes';

@Component({
  selector: 'app-form-gestao-votacao-novo',
  templateUrl: './form-gestao-votacao-novo.component.html',
  styleUrls: ['./form-gestao-votacao-novo.component.css'],
})
export class FormGestaoVotacaoNovoComponent implements OnInit {
  formulario: FormGroup;
  resultadoEncriptacao: any;
  valorDigital: any;
  stepper: any;
  connection: any;
  dataMaxima: any;
  dataMinima: any;
  horaMax: any;
  horaMin: any;
  get f() { return this.formulario.controls; }
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Nome: ['', Validators.required],
      DataInicio: ['', Validators.required],
      DataTermino: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      HoraTermino: ['', Validators.required],
    });
  }
  voltar(event) {
    event.preventDefault();
    this.router.navigate(['gestaoUrna']);
  }
  maxData(type: MatDatepickerInputEvent<Date>) {
    this.dataMaxima = type.value;
  }
  minData(type: MatDatepickerInputEvent<Date>) {
    this.dataMinima = type.value;
  }
  horaMaxima(type) {
    this.horaMax = type;
  }
  horaMinima(type) {
    // console.log(type);
    this.horaMin = type;
  }

  onSubmit(formulario) {
    if (this.formulario.invalid) {
      return;
    }
    this.resultadoEncriptacao = CryptoJS.SHA256(formulario.senha).toString();
    const campos = {
      Apelido: formulario.Apelido,
      Senha: this.resultadoEncriptacao,
    };
    this.authenticationService.cadastroUrna(campos)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data === 'cadastrado') {
            localStorage.setItem('mensagem', campos.Apelido + ' cadastrado(a) com sucesso!');
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
