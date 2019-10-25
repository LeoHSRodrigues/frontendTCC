import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts/release/utils';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';
import { MustMatch } from 'src/app/componentesSemLogin/registro/validacoes';
import { DialogoConfirmacaoComponent } from '../../dialogo-confirmacao/dialogo-confirmacao.component';

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
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private getterServices: GetterServices) {


    this.verificaVotacaoAtivada();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Nome: ['', Validators.required],
      DataInicio: ['', Validators.required],
      DataTermino: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      HoraTermino: ['', Validators.required],
    });
    this.dataMinima = new Date();
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
    this.horaMin = type;
  }

  onSubmit(formulario) {
    if (this.formulario.invalid) {
      return;
    }
    const login = this.authenticationService.currentUserValue;
    const dataInicioVotacao = formulario.DataInicio.format('YYYY-MM-DD') + 'T' + formulario.HoraInicio + ':00Z';
    const DataTerminoVotacao = formulario.DataTermino.format('YYYY-MM-DD') + 'T' + formulario.HoraTermino + ':00Z';
    const nomeEleicao = formulario.Nome;
    this.openDialog(dataInicioVotacao, DataTerminoVotacao, nomeEleicao, login.CPF);
  }

  openDialog(dataInicioVotacao, DataTerminoVotacao, nomeEleicao, CPF) {
    const dialogRef = this.dialog.open(DialogoConfirmacaoComponent, {
      width: '350px',
      data: 'Uma vez iniciada a votação, você não conseguirá editar tampouco criar novos usuários enquanto a mesma estiver ativa. As principais páginas estarão bloqueadas e somente um administrador poderá cancelar ou finalizar a votação, caso não tenha expirado o horário escolhido de encerramento. Você realmente deseja iniciar a votação?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData: FormData = new FormData();
        formData.append('DataInicioVotacao', dataInicioVotacao);
        formData.append('DataTerminoVotacao', DataTerminoVotacao);
        formData.append('NomeEleicao', nomeEleicao);
        formData.append('CPF', CPF);
        formData.append('Status', 'Iniciada');
        this.authenticationService.opcoesVotacao(formData)
          .pipe(first())
          .subscribe(
            (data) => {
              localStorage.setItem('mensagem', nomeEleicao + ' iniciada com sucesso!');
              this.router.navigate(['votacao']);
            },
            (error) => {
            });
      }
    });
  }
  verificaVotacaoAtivada() {
    this.getterServices.verificaUrnaAtivada()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.Status === 'Iniciada' || data.Status === 'Contagem') {
            localStorage.setItem('mensagem', 'Votação em andamento, acompanhe pela página de relatórios!');
            this.router.navigate(['relatorio']);
          } else {
            return;
          }
        },
        (error) => {
          // localStorage.setItem('mensagem', ' Erro, urna não encontrada!');
          // this.router.navigate(['gestaoUrna']);
        });
    return;
  }
}
