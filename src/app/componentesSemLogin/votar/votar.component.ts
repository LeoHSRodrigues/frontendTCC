import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.css'],
})


export class VotarComponent implements OnInit {
  formulario: FormGroup;
  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
  }
}
