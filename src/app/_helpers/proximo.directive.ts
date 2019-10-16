import { AfterViewInit, Directive, ElementRef, HostListener, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { first } from 'rxjs/operators';
import { GetterServices } from '../_services/getters.service';

@Directive({
  selector: '[appProximoDirective],[primeiroInput]',
})
export class ProximoDirective implements AfterViewInit {

  @Input('appProximoDirective') appProximoDirective;
  @Input('appAnteriorDirective') appAnteriorDirective;
  @Input('primeiroInput') primeiroInput;


      constructor(private getterServices: GetterServices, private el: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewInit() {
    this.renderer.selectRootElement('#primeiroInput').focus();
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
      // this.buscarCandidato();
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
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  buscarCandidato() {
    this.getterServices.buscaCandidato()
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        });
  }
}
