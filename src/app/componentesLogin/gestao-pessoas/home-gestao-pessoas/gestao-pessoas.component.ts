import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GetterServices } from 'src/app/_services/getters.service';
import { DialogoConfirmacaoComponent } from '../../dialogo-confirmacao/dialogo-confirmacao.component';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-pessoas-component',
  templateUrl: './gestao-pessoas.component.html',
  styleUrls: ['./gestao-pessoas.component.css'],
})

export class GestaoPessoasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private pessoas: any;

  constructor(private getterServices: GetterServices,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.buscarLista();
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
    this.getterServices.listaPessoas()
      .pipe(first())
      .subscribe(
        (data) => {
          this.pessoas = data;
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
    this.openDialog(id);
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogoConfirmacaoComponent, {
      width: '350px',
      data: 'Deseja realmente apagar este registro?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const values = JSON.parse(localStorage.getItem('usuario'));
        if (id === values.CPF) {
          this.snackBar.open('Não é possível apagar sua conta enquanto você estiver logado', 'Fechar', {
            duration: 3000,
          });
          return ;
        } else {
          this.getterServices.apagarPessoa(id)
            .pipe(first())
            .subscribe(
              (data) => {
                this.ngOnInit();
                return ;
              },
              (error) => {
                console.log(error);
              });
        }
      }
    });
  }


}
