import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GetterServices } from '../_services/getters.service';

@Directive({
  selector: '[appVotacao]',
})
export class ProximoDirective implements AfterViewInit {

  @Input('appVotacao') appVotacao;


  constructor(private getterServices: GetterServices, private router: Router, private snackBar: MatSnackBar, private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.renderer.selectRootElement('#primeiroInput').focus();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.keyCode === 8) {
      const tituloCartao = this.renderer.selectRootElement('#tituloCartao');
      const nomeTitulo = this.renderer.createText('');
      const descricaoTexto = this.renderer.createText('');
      this.renderer.appendChild(tituloCartao, nomeTitulo);
      const imagemCartao = this.renderer.selectRootElement('#imagem');
      this.renderer.setAttribute(imagemCartao, 'src', '');
      const descricaoCard = this.renderer.selectRootElement('#conteudo');
      this.renderer.appendChild(descricaoCard, descricaoTexto);
      return;
    }
    if (e.keyCode === 13) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
}
