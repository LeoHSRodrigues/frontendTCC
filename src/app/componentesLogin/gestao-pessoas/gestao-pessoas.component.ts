import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GetterServices } from 'src/app/_services/getters.service'
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-pessoas-component',
  templateUrl: './gestao-pessoas.component.html',
  styleUrls: ['./gestao-pessoas.component.css']
})

export class GestaoPessoasComponent implements OnInit {

  private pessoas: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private getterServices: GetterServices) { }

  ngOnInit() {
    this.buscarLista();
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

  buscarLista(){
    this.getterServices.listaPessoas()
    .pipe(first())
    .subscribe(
      data => {
        this.pessoas = data;
        return data;
      },
      error => {
        console.log(error);
      });
  }


}
