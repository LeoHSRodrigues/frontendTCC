import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { first } from 'rxjs/operators';
import { GetterServices } from 'src/app/_services/getters.service';


let logData: DataLog[] = [
];

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css'],
})

export class AuditoriaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private displayedColumns: string[] = ['CPF', 'Acao', 'Data'];
  // tslint:disable-next-line: no-use-before-declare
  private dataSource = new MatTableDataSource(logData);
  private resultadoVotacao: boolean;
  constructor(private getterServices: GetterServices) {
    this.buscarLista();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buscarLista() {
    this.getterServices.listaLogs()
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

}

export interface DataLog {
  Acao: string;
  CPF: string;
  Data: string;
}
