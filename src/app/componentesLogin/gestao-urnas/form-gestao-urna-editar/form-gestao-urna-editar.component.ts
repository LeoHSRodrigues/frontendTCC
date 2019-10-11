import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';
import { MustMatch } from 'src/app/componentesSemLogin/registro/validacoes';

@Component({
  selector: 'app-form-gestao-urna-editar',
  templateUrl: './form-gestao-urna-editar.component.html',
  styleUrls: ['./form-gestao-urna-editar.component.css'],
})
export class FormGestaoUrnaEditarComponent implements OnInit {
  formulario: FormGroup;
  resultadoEncriptacao: any;
  valorDigital: any;
  stepper: any;
  connection: any;
  idUrna: any;
  senhaNova: any;
  mudouSenha: any;
  get f() { return this.formulario.controls; }
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private getterServices: GetterServices) {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.buscarUrna(s[2].path);
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Apelido: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', Validators.required],
      valorDigital: [''],
    }, {
      validator: MustMatch('senha', 'confirmaSenha'),
    });
  }
  voltar(event) {
    event.preventDefault();
    this.router.navigate(['gestaoUrna']);
  }

  onSubmit(formulario) {
    if (this.formulario.invalid) {
      return;
    }
    const calculaSenha = String(formulario.senha);
    if (calculaSenha.length >= 64) {
      this.senhaNova = formulario.senha;
      this.mudouSenha = 'Nao';
    } else {
      this.senhaNova = CryptoJS.SHA256(formulario.senha).toString();
      this.mudouSenha = 'Sim';
    }
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    const UUIDurna =  s[2].path;
    const campos = {
      Apelido: formulario.Apelido,
      Senha: this.senhaNova,
      UUID: UUIDurna,
      MudarSenha: this.mudouSenha,
    };
    this.authenticationService.atualizarUrna(campos)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data === 'cadastrado') {
            localStorage.setItem('mensagem', campos.Apelido + ' atualizado(a) com sucesso!');
            this.router.navigate(['gestaoUrna']);
          }
        },
        (error) => {
          // tslint:disable-next-line: max-line-length
          this.snackBar.open('Senha alterada, por favor renomeie o apelido da urna por questões de segurança', 'Fechar', {
            duration: 3000,
          });
        });
  }

  buscarUrna(id) {
    this.getterServices.buscarUrna(id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.formulario.controls.Apelido.setValue(data.Apelido);
          this.formulario.controls.senha.setValue(data.Senha);
          this.formulario.controls.confirmaSenha.setValue(data.Senha);
        },
        (error) => {
          localStorage.setItem('mensagem', ' Erro, urna não encontrada!');
          this.router.navigate(['gestaoUrna']);
        });
    return;
  }

}
