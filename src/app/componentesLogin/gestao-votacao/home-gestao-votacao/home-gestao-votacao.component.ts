import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';
import { DialogoConfirmacaoComponent } from '../../dialogo-confirmacao/dialogo-confirmacao.component';
import { ModalCandidatoComponent } from '../../modal-candidato/modal-candidato.component';

@Component({
  selector: 'app-home-gestao-votacao',
  templateUrl: './home-gestao-votacao.component.html',
  styleUrls: ['./home-gestao-votacao.component.css'],
})
export class HomeGestaoVotacaoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private pessoas: any;
  private fotoSanitizada: any;
  private activeButton: any;
  private tipoPerfil: any;

  constructor(private getterServices: GetterServices,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.buscarLista();
    this.activeButton = 'todos';
    this.setRefinar('grade');
    if (localStorage.getItem('mensagem') !== undefined && localStorage.getItem('mensagem') !== null) {
      this.snackBar.open(localStorage.getItem('mensagem'), 'Fechar', {
        duration: 2000,
      });
      localStorage.removeItem('mensagem');
    }
  }
  setActive = function(buttonName) {
    this.activeButton = buttonName;
  };
  isActive = function(buttonName) {
    return this.activeButton === buttonName;
  };

  setRefinar = function(opcao) {
    this.opcaoAtiva = opcao;
    this.opcaoAtiva = opcao;
  };
  isRefinar = function(opcao) {
    return this.opcaoAtiva === opcao;
  };

  buscarLista() {
    this.getterServices.listaVotacao()
      .pipe(first())
      .subscribe(
        (data) => {
          const resultadoFinal = [];
          data.forEach((element) => {
            // tslint:disable-next-line: forin
            for (const i in element) {
              if (i === 'Foto') {
                if (element[i] === 'N/A') {
                this.fotoSanitizada = undefined;
                } else {
                this.fotoSanitizada = this.sanitizer.bypassSecurityTrustUrl(element[i]);
                }
              } else { }
              if (i === 'tipoConta') {
                if (element[i] === 'Candidato') {
                  this.tipoPerfil = true;
                  } else {
                  this.tipoPerfil = false;
                  }
              }
            }
            resultadoFinal.push({Nome: element.Nome, CPF: element.CPF,
                                 tipoConta: element.tipoConta, Foto: this.fotoSanitizada, Numero: element.Numero, tipoPerfil: this.tipoPerfil});
        });
          this.pessoas = resultadoFinal;
          return data;
        },
        (error) => {
          console.log(error);
        });
  }

  modalCadastro(Tipo, CPF, Nome, Numero) {
    const dados = ({Nome, CPF, Tipo, Numero});
    this.openDialog(dados);
  }

  openDialog(dados): void {
    const dialogRef = this.dialog.open(ModalCandidatoComponent, {
      width: '750px',
      height: '430px',
      data: dados,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.buscarLista();
      }
    });
  }

  removerCandidatura(CPF) {
    this.confirmacaoRemoverCandidatura(CPF);
  }

  confirmacaoRemoverCandidatura(CPF): void {
    const dialogRef = this.dialog.open(DialogoConfirmacaoComponent, {
      width: '350px',
      data: 'Deseja realmente apagar este registro?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authenticationService.removerCandidatura(CPF)
        .pipe(first())
        .subscribe(
          (data) => {
            this.buscarLista();
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
