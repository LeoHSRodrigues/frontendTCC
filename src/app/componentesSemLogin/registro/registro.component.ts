import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BottomSheetOverviewExampleSheet } from '../login/bottomSheet';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})

export class RegistroComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  f: any;
  CPF: any;
  connection: any;
  _bottomSheet: any;
  snackBar: any;

  constructor(private _formBuilder: FormBuilder,private router: Router, private socket: Socket) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  voltar(event){
    event.preventDefault();
    this.router.navigate(['login']);
  }

  getMessages() {
    this.socket.emit("registro", 'mensagemregistro');
    let observable = new Observable(observer => {
      this.socket.on('registro', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  lerDigital(){
      this.connection = this.getMessages().subscribe(message => {
        this.snackBar.open('Por favor preencha o CPF', 'Fechar', {
          duration: 2000
        });
      }); 
  }
}
