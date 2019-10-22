import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogoUrnaComponent } from '../dialogo-urna/dialogo-urna.component';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.css'],
})


export class VotarComponent implements OnInit {

  Apelido: string;
  Senha: string;
  formulario: FormGroup;
  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private renderer: Renderer2, private el: ElementRef, private router: Router) { }

  ngOnInit() {
    const urnaValidada = localStorage.getItem('urna');
    if (urnaValidada) {
      console.log('cadastrada');
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoUrnaComponent, {
      width: '280px',
      height: '300px',
      data: {Apelido: this.Apelido, Senha: this.Senha},
      backdropClass: 'backdropBackground',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

      } else {
        this.router.navigate(['gestaoUrna']);
      }
    });
  }

}

export interface DadosUrna {
  Apelido: string;
  Senha: string;
}
