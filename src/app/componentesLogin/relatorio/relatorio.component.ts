import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import * as moment from 'moment';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';
import { DialogoConfirmacaoComponent } from '../dialogo-confirmacao/dialogo-confirmacao.component';

let logData: DataLog[] = [];
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('cd', { static: true }) private countdown: CountdownComponent;

  private dadosInicio: any;
  private dadosFim: any;
  private time: string;
  private timer: any;
  private inicio: string;
  private contagemCandidatos: string;
  private contagemCadastrados: string;
  private contagemVotos: string;
  private statusVotacao: string;
  private intervalo: any;
  private displayedColumns: string[] = ['Nome', 'Numero', 'Contagem'];
  // tslint:disable-next-line: no-use-before-declare
  private dataSource = new MatTableDataSource(logData);
  private resultadoVotacao: boolean;
  private tempoContagem: { leftTime: number; format: string; prettyText: (text: any) => any; };
  private countdownAgendamento: boolean;

  constructor(private snackBar: MatSnackBar,
              private getterServices: GetterServices,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (localStorage.getItem('mensagem') !== undefined && localStorage.getItem('mensagem') !== null) {
      this.snackBar.open(localStorage.getItem('mensagem'), 'Fechar', {
        duration: 3000,
      });
      localStorage.removeItem('mensagem');
    }
    this.dataSource.paginator = this.paginator;
    this.verificaVotacao();
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
  datasVotacao() {
    this.getterServices.datasVotacaoIniciada()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data !== 'Vazio') {
            const termino = moment(data.DataTermino);
            const inicioVotacao = moment(data.DataInicio);
            const agora = moment(new Date());
            setTimeout(() => {
            this.dadosFim = {
              leftTime: termino.diff(agora, 'seconds'), format: 'HH:mm:ss', prettyText: (text) => {
                return text
                  .split(':')
                  .map((v) => `<span class="item">${v}</span>`)
                  .join(':');
              },
            };
          }, 1100);
            this.timer = setInterval(() => {

            const agoraFinal = moment(new Date());
            const inicioContagem = moment(data.DataInicio); // now
            const diff: any = moment.duration(moment(agoraFinal).diff(moment(inicioContagem)));
            const ms = moment(agoraFinal, 'DD/MM/YYYY HH:mm:ss').diff(moment(inicioContagem, 'DD/MM/YYYY HH:mm:ss'));
            this.time = moment.utc(ms).format('HH:mm:ss');

          }, 1000);
        }
        },
        (error) => {
          console.log(error);
          this.snackBar.open('aa', 'Fechar', {
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
      this.openDialog(admin.CPF, 'Encerrar');
    }
  }
  FinalizarVotacao() {
    const admin = this.authenticationService.currentUserValue;
    if (admin.tipoConta !== 'Admin') {
      this.snackBar.open('Você não possui permissão para encerrar a votação', 'Fechar', {
        duration: 2000,
      });
    } else {
      this.openDialog(admin.CPF, 'Finalizar');
    }
  }


  verificaVotacao() {
    this.getterServices.verificaStatusVotacao()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data) {
            if (data.Status === 'Iniciada') {
              this.statusVotacao = '1';
              this.contaCandidato();
              this.contaCadastrados();
              this.datasVotacao();
              this.intervalo = setInterval(() => { this.contaVotos(); }, 3500);
            } else if (data.Status === 'Contagem') {
              this.statusVotacao = '2';
              this.buscarLista();
              clearInterval(this.intervalo);
            } else {
              clearInterval(this.intervalo);
              this.statusVotacao = '3';
              this.countdownInicio();
            }
          } else {
            clearInterval(this.intervalo);
            this.statusVotacao = '3';
            this.countdownInicio();
          }
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }
  verificaVotacaoStatus() {
    this.intervalo = setTimeout(() => {
    this.getterServices.verificaStatusVotacao()
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          if (data) {
            if (data.Status === 'Iniciada') {
              this.contaCandidato();
              this.contaCadastrados();
              this.datasVotacao();
              this.statusVotacao = '1';
            } else if (data.Status === 'Contagem') {
              this.statusVotacao = '2';
            } else {
              this.statusVotacao = '3';
            }
          } else {
            this.statusVotacao = '3';
          }
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
      }, 5000);
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      console.log(e.action);
      this.verificaVotacaoStatus();
    } else {

    }
  }

  countdownInicio() {
    this.getterServices.datasVotacaoIniciada()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data !== 'Vazio') {
            this.countdownAgendamento = true;
            const termino = moment(data.DataTermino);
            const inicioVotacao = moment(data.DataInicio);
            const agora = moment(new Date());
            this.tempoContagem = {
              leftTime: inicioVotacao.diff(agora, 'seconds'), format: 'HH:mm:ss', prettyText: (text) => {
                return text
                  .split(':')
                  .map((v) => `<span class="item">${v}</span>`)
                  .join(':');
              },
            };
        } else {
          this.countdownAgendamento = false;
        }
        },
        (error) => {
          console.log(error);
          this.snackBar.open('aa', 'Fechar', {
            duration: 2000,
          });
        });
  }

  contagemRestante(e: CountdownEvent) {
    if (e.action === 'done') {
      console.log(e);
      this.verificaVotacaoStatus();
  } else {
  }
  }

  buscarLista() {
    this.getterServices.listaVotos()
      .pipe(first())
      .subscribe(
        (data) => {
          logData = data;
          this.dataSource = new MatTableDataSource(logData);
          this.changeDetectorRef.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.countdown.begin();
          return data;
        },
        (error) => {
          console.log(error);
        });
  }

  listaPessoasCadastradas() {
    const listaUrnas = [];
    this.getterServices.listaPessoas()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.length > 0) {
            data.forEach((key, val) => {
              if (key.tipoConta === 'Admin') {
                listaUrnas.push([key.CPF, key.Nome, 'Administrador']);
              } else if (key.tipoConta === 'Func') {
                listaUrnas.push([key.CPF, key.Nome, 'Funcionário']);
              } else {
                listaUrnas.push([key.CPF, key.Nome, 'Usuário']);
              }
            });
            const documento = new jsPDF('portrait', 'px', 'a4') as JsPDFWithPlugin;
            documento.setProperties({
              title: 'Lista de Pessoas Cadastradas',
            });
            documento.text('Lista de Pessoas Cadastradas', 150, 30);
            documento.autoTable({ head: [['CPF', 'Nome', 'Tipo de Conta']], body: listaUrnas, startY: 50, theme: 'grid' });
            documento.output('dataurlnewwindow');
          } else {
            this.snackBar.open('Erro nenhum candidato encontrado', 'Fechar', {
              duration: 2000,
            });
          }
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }

  listaCandidatosCadastradas() {
    const listaUrnas = [];
    this.getterServices.listaCandidatos()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.length > 0) {
            data.forEach((key, val) => {
              listaUrnas.push([key.CPF, key.Nome, key.Numero]);
            });
            const documento = new jsPDF('portrait', 'px', 'a4') as JsPDFWithPlugin;
            documento.setProperties({
              title: 'Lista de Candidatos Cadastradas',
            });
            documento.text('Lista de Candidatos Cadastradas', 140, 30);
            documento.autoTable({ head: [['CPF', 'Nome', 'Número']], body: listaUrnas, startY: 50, theme: 'grid' });
            documento.output('dataurlnewwindow');
          } else {
            this.snackBar.open('Erro nenhum candidato encontrado', 'Fechar', {
              duration: 2000,
            });
          }
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }

  listaFinalVotacao() {
    const listaUrnas = [];
    this.getterServices.listaVotos()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.length > 0) {
            data.forEach((key, val) => {
              listaUrnas.push([key._id.Nome, key._id.Numero, key.Contagem]);
            });
            const documento = new jsPDF('portrait', 'px', 'a4') as JsPDFWithPlugin;
            documento.setProperties({
              title: 'Resultado da contagem de Votos',
            });
            documento.text('Resultado da contagem de Votos', 140, 30);
            documento.autoTable({ head: [['Nome', 'Número', 'Contagem']], body: listaUrnas, startY: 50, theme: 'grid' });
            documento.output('dataurlnewwindow');
          } else {
            this.snackBar.open('Erro nenhum candidato encontrado', 'Fechar', {
              duration: 2000,
            });
          }
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }

  listaUrnasCadastradas() {
    const listaUrnas = [];
    this.getterServices.listaUrnas()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.length > 0) {
            data.forEach((key, val) => {
              listaUrnas.push([key.UUID, key.Apelido]);
            });
            const documento = new jsPDF('portrait', 'px', 'a4') as JsPDFWithPlugin;
            documento.setProperties({
              title: 'Lista de Urnas',
            });
            documento.text('Lista de Urnas Cadastradas', 150, 30);
            documento.autoTable({ head: [['UUID', 'Apelido']], body: listaUrnas, startY: 50, theme: 'grid' });
            documento.output('dataurlnewwindow');
          } else {
            this.snackBar.open('Erro nenhum candidato encontrado', 'Fechar', {
              duration: 2000,
            });
          }
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }

  atualizarVotacaoPessoas() {
    this.getterServices.atualizarVotacaoPessoas()
    .pipe(first())
    .subscribe(
      (data) => {
      },
      (error) => {
        this.snackBar.open('Erro', 'Fechar', {
          duration: 2000,
        });
      });
  }

  openDialog(CPF, tipo) {
    if (tipo === 'Encerrar') {
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
                this.buscarLista();
                this.statusVotacao = '2';
              },
              (error) => {
                this.snackBar.open('Erro', 'Fechar', {
                  duration: 2000,
                });
              });
        }
      });
    } else {
      const dialogRef = this.dialog.open(DialogoConfirmacaoComponent, {
        width: '350px',
        data: 'Você realmente deseja finalizar a votação?',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.getterServices.finalizarVotacao(CPF)
            .pipe(first())
            .subscribe(
              (data) => {
                this.verificaVotacao();
                this.listaFinalVotacao();
                this.atualizarVotacaoPessoas();
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

  tempoRestante(fim, inicio) {
    const t = Date.parse(fim) - Date.parse(inicio);
    return {
      Total: t,
      Days: Math.floor(t / (1000 * 60 * 60 * 24)),
      Hours: Math.floor((t / (1000 * 60 * 60)) % 24),
      Minutes: Math.floor((t / 1000 / 60) % 60),
      Seconds: Math.floor((t / 1000) % 60),
    };
  }
}
interface JsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}
export interface DataLog {
  Acao: string;
  CPF: string;
  Data: string;
}
