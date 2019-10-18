import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GetterServices } from '../_services/getters.service';

@Directive({
  selector: '[appProximoDirective],[primeiroInput],[divCandidato]',
})
export class ProximoDirective implements AfterViewInit {

  @Input('appProximoDirective') appProximoDirective;
  @Input('appAnteriorDirective') appAnteriorDirective;
  @Input('divCandidato') divCandidato;


      constructor(private getterServices: GetterServices, private router: Router, private snackBar: MatSnackBar, private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.selectRootElement('#primeiroInput').focus();
    // const card = this.renderer.selectRootElement('#candidato');
    // this.renderer.setAttribute(card, 'style', 'display:hidden');
    // this.elementRef.nativeElement.style.display = 'none';
  }

  @HostListener('input', ['$event.target'])
  onInput(input) {
    const length = input.value.length;
    const maxLength = input.attributes.maxlength.value;
    if (length >= maxLength) {
      this.appProximoDirective.focus();
    }
    if (length === 0) {
      this.appAnteriorDirective.focus();
    }
    if (input.attributes.id.value === 'input5' && length >= maxLength) {
      this.buscarCandidato();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    const aa = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    if (e.keyCode === 8) {
      // e.target.dispatchEvent(aa);
      return;
    }
    if (e.keyCode === 13) {
      if (this.renderer.selectRootElement('#input5').value === '' && this.renderer.selectRootElement('#conteudo').value === undefined) {
        this.snackBar.open('Preencha todos os campos', 'Fechar', {
          duration: 1500,
        });
      } else {
        this.salvarVoto();
      }
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  salvarVoto() {
    const numero = this.renderer.selectRootElement('#primeiroInput').value + this.renderer.selectRootElement('#input2').value + this.renderer.selectRootElement('#input3').value + this.renderer.selectRootElement('#input4').value + this.renderer.selectRootElement('#input5').value;
    this.getterServices.salvarOpcaoVoto(numero)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/teste']);
        },
        (error) => {
          // console.log(error);
          this.snackBar.open('Candidato não encontrado', 'Fechar', {
            duration: 1500,
          });
        });
  }

  buscarCandidato() {
    const numero = this.renderer.selectRootElement('#primeiroInput').value + this.renderer.selectRootElement('#input2').value + this.renderer.selectRootElement('#input3').value + this.renderer.selectRootElement('#input4').value + this.renderer.selectRootElement('#input5').value;
    this.getterServices.buscaCandidato(numero)
      .pipe(first())
      .subscribe(
        (data) => {
          const tituloCartao = this.renderer.selectRootElement('#tituloCartao');
          const nomeTitulo = this.renderer.createText(data.Nome);
          const descricaoTexto = this.renderer.createText('Pressione ENTER para confirmar o voto ou BACKSPACE para apagar os números');
          this.renderer.appendChild(tituloCartao, nomeTitulo);
          const imagemCartao = this.renderer.selectRootElement('#imagem');
          this.renderer.setAttribute(imagemCartao, 'src', 'http://' + data.Foto);
          const descricaoCard = this.renderer.selectRootElement('#conteudo');
          this.renderer.appendChild(descricaoCard, descricaoTexto);
        },
        (error) => {
          // console.log(error);
          this.snackBar.open('Candidato não encontrado', 'Fechar', {
            duration: 1500,
          });
        });
  }
}
