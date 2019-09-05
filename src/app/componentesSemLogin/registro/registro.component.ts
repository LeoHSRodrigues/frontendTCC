import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { MatSnackBar, MatStepper } from '@angular/material';
import { Validacoes } from '../login/validacoes';
import { MustMatch } from './validacoes';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})

export class RegistroComponent implements OnInit {

  formulario: FormGroup;
  isEditable = false;
  CPF: any;
  connection: any;
  digital: boolean;
  valorDigital: string;
  conta = [
    { valor: 'Admin', label: 'Administrador' },
    { valor: 'Func', label: 'Funcionário' },
    { valor: 'User', label: 'Usuário' }
  ];
  resultadoEncriptacao: any;
  digitalReadOnly: boolean;
  get f() { return this.formulario.controls; }

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private socket: Socket,
    private authenticationService: AuthenticationService, ) { }

  ngOnInit() {
    this.digital = true;
    this.digitalReadOnly = false;
    this.formulario = this._formBuilder.group({
      Nome: ['', Validators.required],
      CPF: ['', Validators.compose([Validators.required, Validators.minLength(11), Validacoes])],
      tipoConta: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', Validators.required],
      valorDigital: [''],
    }, {
        validator: MustMatch('senha', 'confirmaSenha')
      });
  }
  voltar(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

  getMessages(tipo: string) {
    if (tipo === 'autenticar'){
    this.socket.emit("registro", 'mensagemregistro');
    let observable = new Observable(observer => {
      this.socket.on('registro', (data) => {
        if (data != 'achou' && data != 'nachou') {
          this.snackBar.open(data, 'Fechar', {
            duration: 2000
          });
        }
        else {
          if (data === 'achou') {
            this.stepper.selected.completed = true;
            this.stepper.selected.editable = false;
            this.stepper.next();
          }
          else {
            this.snackBar.open('n achou', 'Fechar', {
              duration: 2000
            });
          }
        }
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
  else{
    this.socket.emit("cadastro", 'mensagemcadastro');
    let observable = new Observable(observer => {
      this.socket.on('cadastro', (data) => {
        if (data.indexOf('[') != 0){
          this.snackBar.open(data, 'Fechar', {
            duration: 2000
          });
        }
        else{
          this.formulario.controls['valorDigital'].setValue(data);
        }
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}

  lerDigital() {
    this.connection = this.getMessages('autenticar').subscribe(message => {
    });
  }

  cadastrarDigital() {
    this.connection = this.getMessages('criar').subscribe(message => {
    });
  }

  @ViewChild(MatStepper, { static: true }) stepper: MatStepper;

  complete(formulario) {
    if (this.formulario.invalid) {
      return;
    }
    if(formulario.valorDigital != ''){
      this.valorDigital = formulario.valorDigital;
      this.valorDigital = this.valorDigital.replace(/[ ]*,[ ]*|[ ]+/g, ' ');
      this.valorDigital = this.valorDigital.slice(1,-3);
    }
    else{
      this.valorDigital = 'vazio';
    }
    this.resultadoEncriptacao = CryptoJS.SHA256(formulario.senha).toString();
    let campos = {Nome: formulario.Nome, CPF: formulario.CPF, tipoConta: formulario.tipoConta, Senha: this.resultadoEncriptacao, Digital: this.valorDigital};
    this.authenticationService.cadastro(campos)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
    this.stepper.selected.completed = true;
    this.stepper.selected.editable = false;
    this.stepper.next();
  }
}
