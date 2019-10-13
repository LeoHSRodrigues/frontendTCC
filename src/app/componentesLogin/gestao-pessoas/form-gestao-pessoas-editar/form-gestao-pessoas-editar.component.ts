import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';
import { Validacoes } from 'src/app/componentesSemLogin/login/validacoes';
import { MustMatch } from 'src/app/componentesSemLogin/registro/validacoes';
@Component({
  selector: 'app-form-gestao-pessoas',
  templateUrl: './form-gestao-pessoas-editar.component.html',
  styleUrls: ['./form-gestao-pessoas-editar.component.css'],
})
export class FormGestaoPessoasEditarComponent implements OnInit {
  formulario: FormGroup;
  resultadoEncriptacao: any;
  valorDigital: any;
  senhaNova: any;
  stepper: any;
  connection: any;
  resultadoPessoa: string;
  id: string;
  fragment: any;
  queryParams: any;
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
              private snackBar: MatSnackBar,
              private getterServices: GetterServices ) {
                const tree: UrlTree = router.parseUrl(this.router.url);
                const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
                const s: UrlSegment[] = g.segments;
                this.buscarPessoa(s[2].path);
              }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Nome: ['', Validators.required],
      CPF: ['', Validators.compose([Validators.required, Validators.minLength(11), Validacoes])],
      tipoConta: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', Validators.required],
      valorDigital: [''],
    }, {
      validator: MustMatch('senha', 'confirmaSenha'),
    });
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

  buscarPessoa(id) {
    this.getterServices.buscarPessoa(id)
    .pipe(first())
    .subscribe(
      (data) => {
        this.formulario.controls.valorDigital.setValue(data.Digital);
        this.formulario.controls.Nome.setValue(data.Nome);
        this.formulario.controls.CPF.setValue(data.CPF);
        this.formulario.controls.tipoConta.setValue(data.tipoConta);
        this.formulario.controls.senha.setValue(data.Senha);
        this.formulario.controls.confirmaSenha.setValue(data.Senha);
      },
      (error) => {
        console.log(error);
        // localStorage.setItem('mensagem', ' Erro, cadastro não encontrado!');
        // this.router.navigate(['gestaoPessoal']);
      });
    return this.resultadoPessoa;
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
    const calculaSenha = String(formulario.senha);
    if (calculaSenha.length >= 64) {
      this.senhaNova = formulario.senha;
    } else {
      this.senhaNova = CryptoJS.SHA256(formulario.senha).toString();
    }
    const campos = {
      Nome: formulario.Nome,
      CPF: formulario.CPF,
      tipoConta: formulario.tipoConta,
      Senha: this.senhaNova,
      Digital: this.valorDigital,
    };
    this.authenticationService.atualizarPessoa(campos)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data === 'cadastrado') {
            localStorage.setItem('mensagem', campos.Nome + ' atualizado(a) com sucesso!');
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
