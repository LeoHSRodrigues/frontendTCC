import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';

const ELEMENT_DATA: PeriodicElement[] = [
  {Nome: 'Nome do doido', Acao: 'Hydrogen', data: 1.0079, },
  {Nome: 'Nome do doido', Acao: 'Helium', data: 4.0026, },
  {Nome: 'Nome do doido', Acao: 'Lithium', data: 6.941, },
  {Nome: 'Nome do doido', Acao: 'Beryllium', data: 9.0122, },
  {Nome: 'Nome do doido', Acao: 'Boron', data: 10.811, },
  {Nome: 'Nome do doido', Acao: 'Carbon', data: 12.0107, },
  {Nome: 'Nome do doido', Acao: 'Nitrogen', data: 14.0067, },
  {Nome: 'Nome do doido', Acao: 'Oxygen', data: 15.9994, },
  {Nome: 'Nome do doido', Acao: 'Fluorine', data: 18.9984, },
  {Nome: 'Nome do doido', Acao: 'Neon', data: 20.1797, },
  {Nome: 'Nome do doido', Acao: 'Sodium', data: 22.9897, },
  {Nome: 'Nome do doido', Acao: 'Magnesium', data: 24.305, },
  {Nome: 'Nome do doido', Acao: 'Aluminum', data: 26.9815, },
  {Nome: 'Nome do doido', Acao: 'Silicon', data: 28.0855, },
  {Nome: 'Nome do doido', Acao: 'Phosphorus', data: 30.9738, },
  {Nome: 'Nome do doido', Acao: 'Sulfur', data: 32.065, },
  {Nome: 'Nome do doido', Acao: 'Chlorine', data: 35.453, },
  {Nome: 'Nome do doido', Acao: 'Argon', data: 39.948, },
  {Nome: 'Nome do doido', Acao: 'Potassium', data: 39.0983, },
  {Nome: 'Nome do doido', Acao: 'Calcium', data: 40.078, },
];

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})

export class AuditoriaComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['Nome', 'Acao', 'data'];
  // tslint:disable-next-line: no-use-before-declare
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

export interface PeriodicElement {
  Acao: string;
  Nome: string;
  data: number;
}
