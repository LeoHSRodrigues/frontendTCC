import { Component, OnInit } from '@angular/core';

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
  constructor() {
  }
  ngOnInit() {
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
}
