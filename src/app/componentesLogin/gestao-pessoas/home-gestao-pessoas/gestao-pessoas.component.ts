import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';
import { DialogoConfirmacaoComponent } from '../../dialogo-confirmacao/dialogo-confirmacao.component';

@Component({
  selector: 'app-pessoas-component',
  templateUrl: './gestao-pessoas.component.html',
  styleUrls: ['./gestao-pessoas.component.css'],
})

export class GestaoPessoasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private pessoas: any;
  private fotoSanitizada: any;
  private activeButton: any;

  constructor(private getterServices: GetterServices,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private authenticationService: AuthenticationService,
              private http: HttpClient,
  ) { }

  ngOnInit() {
    this.buscarLista();
    this.setRefinar('grade');
    if (localStorage.getItem('mensagem') !== undefined && localStorage.getItem('mensagem') !== null) {
      this.snackBar.open(localStorage.getItem('mensagem'), 'Fechar', {
        duration: 2000,
      });
      localStorage.removeItem('mensagem');
    }
  }

  setRefinar = function(opcao) {
    this.opcaoAtiva = opcao;
  };
  isRefinar = function(opcao) {
    return this.opcaoAtiva === opcao;
  };

  buscarLista() {
    this.getterServices.listaPessoas()
      .pipe(first())
      .subscribe(
        (data) => {
          const resultadoFinal = [];
          data.forEach((element) => {
            // tslint:disable-next-line: forin
            for (const i in element) {
              if (i === 'Foto') {
                if (element[i] !== undefined && element[i] !== 'N/A') {
                  this.fotoSanitizada = this.sanitizer.bypassSecurityTrustUrl(element[i]);
                } else {
                  this.fotoSanitizada = undefined;
                }
              } else { }
            }
            resultadoFinal.push({Nome: element.Nome, CPF: element.CPF,
                                 tipoConta: element.tipoConta, Foto: this.fotoSanitizada});
        });
          this.pessoas = resultadoFinal;
          return data;
        },
        (error) => {
          console.log(error);
        });
  }

  visualizarPerfil(id) {
    this.router.navigate(['gestaoPessoal/editar/' + id]);
  }

  apagar(id) {
    const admin = this.authenticationService.currentUserValue;
    if (admin.tipoConta !== 'Admin') {
      this.snackBar.open('Você não possui permissão para apagar contas de administrador', 'Fechar', {
        duration: 3000,
      });
    } else {
      if (admin.CPF === id) {
          this.snackBar.open('Não é possível apagar sua conta enquanto você estiver logado', 'Fechar', {
            duration: 3000,
          });
      } else {
        this.openDialog(id);
      }
    }
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogoConfirmacaoComponent, {
      width: '350px',
      data: 'Deseja realmente apagar este registro?',
    });

    dialogRef.afterClosed().subscribe((result) => {
          this.getterServices.apagarPessoa(id)
            .pipe(first())
            .subscribe(
              (data) => {
                this.getterServices.apagarCandidato(id)
                .pipe(first())
                .subscribe(
                  () => {
                    this.buscarLista();
                    return ;
                  },
                  (error) => {
                    console.log(error);
                  });
              },
              (error) => {
                console.log(error);
              });
    });
  }


}
