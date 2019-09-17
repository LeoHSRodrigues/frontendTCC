import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-gestao-pessoas',
  templateUrl: './form-gestao-pessoas.component.html',
  styleUrls: ['./form-gestao-pessoas.component.css']
})
export class FormGestaoPessoasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltar(event) {
    event.preventDefault();
    this.router.navigate(['gestaoPessoal']);
  }

}
