import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { GetterServices } from 'src/app/_services/getters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public rede = [
    {
      name: 'Uso médio de rede',
      value: 514250,
    },
  ];

  public cpu = [
    {
      name: 'Uso médio de CPU',
      value: 2500,
    },
  ];

  public memoria = [
    {
      name: 'Uso médio de memória',
      value: 524288000,
    },
  ];
  public disco = [
    {
      name: 'Uso médio de disco',
      value: 25000000,
    },
  ];
  colorScheme = {domain: ['#ffffff']};
  private contagemCadastrados: string;
  private contagemUrnas: string;
  constructor(private snackBar: MatSnackBar, private getterServices: GetterServices) {
  }
  ngOnInit() {
    this.contaCadastrados();
    this.contaUrnas();
    if (localStorage.getItem('mensagem') !== undefined && localStorage.getItem('mensagem') !== null) {
      this.snackBar.open(localStorage.getItem('mensagem'), 'Fechar', {
        duration: 2000,
      });
      localStorage.removeItem('mensagem');
    }
  }
  public gaugeValueFormatting = (valor: string) => {
    return valor + '%';
  }
  public numbercardValueFormattingDiscoRedeMemoria = (source: any, decimals = 2) => {
    if (source.data.value === 0) { return '0 Bytes'; }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(source.data.value) / Math.log(k));

    return parseFloat((source.data.value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  public numbercardValueFormattingCPU = (source: any, decimals = 2) => {

    return '1.5Ghz';
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
  contaUrnas() {
    this.getterServices.contaUrnas()
      .pipe(first())
      .subscribe(
        (data) => {
          this.contagemUrnas = data;
        },
        (error) => {
          this.snackBar.open('Erro', 'Fechar', {
            duration: 2000,
          });
        });
  }

}
