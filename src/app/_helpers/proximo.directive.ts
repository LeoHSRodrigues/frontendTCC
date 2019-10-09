import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appProximoDirective],[primeiroInput]',
})
export class ProximoDirective implements AfterViewInit {

  @Input('appProximoDirective') appProximoDirective;
  @Input('primeiroInput') primeiroInput;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    // this.el.nativeElement.focus();
    // this.renderer.selectRootElement(this.primeiroInput.focus());
    this.renderer.selectRootElement('#primeiroInput').focus();
  //   setTimeout(() => {
  //     console.log(this.el);
  //     this.el.nativeElement.focus();

  // }, 500);
    // this.primeiroInput.nativeElement.focus();
  }

  @HostListener('input', ['$event.target']) onInput(input) {
    const length = input.value.length;
    const maxLength = input.attributes.maxlength.value;
    console.log(this.appProximoDirective);
    if (length >= maxLength) {
      this.appProximoDirective.focus();
    }
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      [8].indexOf(e.keyCode) !== -1) {
      return;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  }
}
