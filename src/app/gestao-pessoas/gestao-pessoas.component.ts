import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SomeService, PeriodicElement } from './temporario';

export interface PeriodicElement {
  name: string;
  CPF: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-gestao-pessoas',
  templateUrl: './gestao-pessoas.component.html',
  styleUrls: ['./gestao-pessoas.component.css']
})

export class GestaoPessoasComponent implements OnInit {
  constructor(private myService: SomeService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.myService.doSomething().subscribe((data: PeriodicElement[]) => {
      this.dataSource.data = data;
    });
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  setActive = function (buttonName){
    this.activeButton = buttonName;
    this.myService.doSomething().subscribe((data: PeriodicElement[]) => {
      this.dataSource.data = data;
    });
  }
  isActive = function (buttonName){
    return this.activeButton === buttonName;
  }

  refresh() {
    this.myService.doSomething().subscribe((data: PeriodicElement[]) => {
      this.dataSource.data = data;
    });
  }

}    
