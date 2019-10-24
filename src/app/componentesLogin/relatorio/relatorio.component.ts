import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';
import { DialogoConfirmacaoComponent } from '../dialogo-confirmacao/dialogo-confirmacao.component';


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {

  private contagemCandidatos: string;
  private contagemCadastrados: string;
  private contagemVotos: string;
  private statusVotacao: string;

  constructor(private snackBar: MatSnackBar, private getterServices: GetterServices, private authenticationService: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('mensagem') !== undefined && localStorage.getItem('mensagem') !== null) {
      this.snackBar.open(localStorage.getItem('mensagem'), 'Fechar', {
        duration: 3000,
      });
      localStorage.removeItem('mensagem');
    }
    this.verificaVotacao();
    this.contaCandidato();
    this.contaCadastrados();
    this.contaVotos();
  }
  contaCandidato() {
    this.getterServices.contaCandidatos()
      .pipe(first())
      .subscribe(
        (data) => {
          this.contagemCandidatos = data;
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }
  contaCadastrados() {
    this.getterServices.contaCadastrados()
      .pipe(first())
      .subscribe(
        (data) => {
          this.contagemCadastrados = data;
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }
  contaVotos() {
    this.getterServices.contaVotos()
      .pipe(first())
      .subscribe(
        (data) => {
          this.contagemVotos = data;
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }
  encerrarVotacao() {
    const admin = this.authenticationService.currentUserValue;
    if (admin.tipoConta !== 'Admin') {
      this.snackBar.open('Você não possui permissão para encerrar a votação', 'Fechar', {
        duration: 2000,
      });
    } else {
      this.openDialog(admin.CPF);
    }
  }
  verificaVotacao() {
    this.getterServices.verificaStatusVotacao()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.Status === 'Iniciada') {
            this.statusVotacao = '1';
          } else if (data.Status === 'Contagem') {
            this.statusVotacao = '2';
          } else {
            this.statusVotacao = '3';
          }
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }

  listaPessoasCadastradas() {
    const documento = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    documento.setProperties({
      title: 'Lista de Pessoas Cadastradas',
      });
    documento.text('Lista de Pessoas Cadastradas', 20, 30);
    documento.autoTable({
        head: [['CPF', 'Nome', 'Tipo de Conta']],
        body: [
          ['David', 'david@example.com', 'Sweden'],
          ['Castille', 'castille@example.com', 'Norway'],
        ],
      });
    documento.output('dataurlnewwindow');
  }

  listaCandidatosCadastradas() {
    const documento = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    documento.setProperties({
      title: 'Lista de Candidatos',
      });
    documento.text('Lista de Candidatos Cadastradas', 20, 30);
    documento.autoTable({
      head: [['CPF', 'Nome', 'Número']],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Norway'],
      ],
    });
    documento.output('dataurlnewwindow');
  }

  listaUrnasCadastradas() {
    const documento = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    documento.setProperties({
      title: 'Lista de Urnas',
      });
    documento.text('Lista de Urnas Cadastradas', 150, 30);
    documento.text('', 150, 30);
    documento.autoTable({
        head: [['UUID', 'Apelido']],
        body: [['David', 'david@example.com'],
          ['Castille', 'castille@example.com'],
        ],
      });
    documento.output('dataurlnewwindow');
  }

  openDialog(CPF) {
    const dialogRef = this.dialog.open(DialogoConfirmacaoComponent, {
      width: '350px',
      data: 'Você realmente deseja finalizar a votação e iniciar a validação dos votos?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getterServices.encerraVotacao(CPF)
          .pipe(first())
          .subscribe(
            (data) => {
              this.verificaVotacao();
              this.contaCandidato();
              this.contaCadastrados();
              this.contaVotos();
            },
            (error) => {
              this.snackBar.open('Erro', 'Fechar', {
                duration: 2000,
              });
            });
      }
    });
  }
}
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}
