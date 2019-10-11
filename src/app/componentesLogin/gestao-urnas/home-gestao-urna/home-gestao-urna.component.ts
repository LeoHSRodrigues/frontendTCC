import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GetterServices } from 'src/app/_services/getters.service';
import { DialogoConfirmacaoComponent } from '../../dialogo-confirmacao/dialogo-confirmacao.component';


let logData: Urna[] = [
];

@Component({
  selector: 'app-home-gestao-urna',
  templateUrl: './home-gestao-urna.component.html',
  styleUrls: ['./home-gestao-urna.component.css'],
})

export class HomeGestaoUrnaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private displayedColumns: string[] = ['CPF', 'Acao', 'Data'];
  // tslint:disable-next-line: no-use-before-declare
  private dataSource = new MatTableDataSource(logData);

  constructor(private getterServices: GetterServices, public dialog: MatDialog, private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.buscarLista();
    if (localStorage.getItem('mensagem') !== undefined && localStorage.getItem('mensagem') !== null) {
      this.snackBar.open(localStorage.getItem('mensagem'), 'Fechar', {
        duration: 2000,
      });
      localStorage.removeItem('mensagem');
    }
  }

  visualizarUrna(id) {
    this.router.navigate(['gestaoUrna/editar/' + id]);
  }

  buscarLista() {
    this.getterServices.listaUrnas()
    .pipe(first())
    .subscribe(
      (data) => {
        logData = data;
        this.dataSource = new MatTableDataSource(logData);
        this.dataSource.paginator = this.paginator;
        return data;
      },
      (error) => {
        console.log(error);
      });
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
          this.getterServices.apagarUrna(id)
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
    });
  }

}

export interface Urna {
  Acao: string;
  CPF: string;
  Data: string;
}
