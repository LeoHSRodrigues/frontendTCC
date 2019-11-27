import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Validacoes } from 'src/app/componentesSemLogin/login/validacoes';
import { MustMatch } from 'src/app/componentesSemLogin/registro/validacoes';

@Component({
  selector: 'app-form-gestao-pessoas',
  templateUrl: './form-gestao-pessoas-novo.component.html',
  styleUrls: ['./form-gestao-pessoas-novo.component.css'],
})

export class FormGestaoPessoasNovoComponent implements OnInit {
  formulario: FormGroup;
  resultadoEncriptacao: any;
  valorDigital: any;
  stepper: any;
  connection: any;
  url: any;
  get f() { return this.formulario.controls; }
  conta = [
    { valor: 'Admin', label: 'Administrador' },
    { valor: 'Func', label: 'Funcionário' },
    { valor: 'User', label: 'Usuário' },
  ];
  constructor(private router: Router,
              private socket: Socket,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Nome: ['', Validators.required],
      CPF: ['', Validators.compose([Validators.required, Validators.minLength(11), Validacoes])],
      tipoConta: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', Validators.required],
      valorDigital: [''],
      foto: [''],
    }, {
      validator: MustMatch('senha', 'confirmaSenha'),
    });
  }

  onSelectFile(imagem) {
    if (imagem.target.files[0].type !== 'image/png' && imagem.target.files[0].type !== 'image/jpeg') {
      this.snackBar.open('Tipo de arquivo não permitido', 'Fechar', {
        duration: 2000,
      });
      this.formulario.controls.foto.setValue('');
      this.url = '';
      return;
    }
    if (imagem.target.files && imagem.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(imagem.target.files[0]);

      reader.onload = (resultadoImagem) => {
        this.url = (resultadoImagem.target as FileReader).result;
      };
      this.formulario.patchValue({
        foto: imagem.target.files[0],
      });
    }
  }

  getMessages(tipo: string) {
    if (tipo === 'autenticar') {
    this.socket.emit('registro', 'mensagemregistro');
    const observable = new Observable((observer) => {
      this.socket.on('registro', (data) => {
        if (data !== 'achou' && data !== 'nachou') {
          this.snackBar.open(data, 'Fechar', {
            duration: 2000,
          });
        } else {
          if (data === 'achou') {
            this.stepper.selected.completed = true;
            this.stepper.selected.editable = false;
            this.stepper.next();
          } else {
            this.snackBar.open('Biometria não encontrada no sistema', 'Fechar', {
              duration: 2000,
            });
          }
        }
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  } else {
    this.socket.emit('cadastro', 'mensagemcadastro');
    const observable = new Observable((observer) => {
      this.socket.on('cadastro', (data) => {
        if (data.indexOf('[') !== 0) {
          this.snackBar.open(data, 'Fechar', {
            duration: 2000,
          });
        } else {
          this.formulario.controls.valorDigital.setValue(data);
        }
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}

  voltar(event) {
    event.preventDefault();
    this.router.navigate(['gestaoPessoal']);
  }

  cadastrarDigital() {
    this.connection = this.getMessages('criar').subscribe((message) => {
    });
  }

  onSubmit(formulario) {
    if (this.formulario.invalid) {
      return;
    }
    if (formulario.valorDigital !== '') {
      this.valorDigital = formulario.valorDigital;
      this.valorDigital = this.valorDigital.replace(/[ ]*,[ ]*|[ ]+/g, ' ');
      this.valorDigital = this.valorDigital.slice(1, -3);
    } else {
      this.valorDigital = 'vazio';
    }
    this.resultadoEncriptacao = CryptoJS.SHA256(formulario.senha).toString();
    const formData: FormData = new FormData();
    formData.append('Nome', formulario.Nome);
    formData.append('CPF', formulario.CPF);
    formData.append('tipoConta', formulario.tipoConta);
    formData.append('Senha', this.resultadoEncriptacao);
    formData.append('Digital', formulario.Digital);
    formData.append('Foto', formulario.foto);
    this.authenticationService.cadastroPessoa(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data === 'cadastrado') {
            localStorage.setItem('mensagem', formulario.Nome + ' cadastrado(a) com sucesso!');
            this.router.navigate(['gestaoPessoal']);
          }
        },
        (error) => {
          this.snackBar.open('CPF já cadastrado', 'Fechar', {
            duration: 2000,
          });
        });
  }
}
