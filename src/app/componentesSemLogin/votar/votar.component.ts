import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';
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
  encontrado: boolean;
  votacaoAtivada: boolean;
  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
              private renderer: Renderer2, private el: ElementRef,
              private router: Router, private getterServices: GetterServices,
              private snackBar: MatSnackBar,
              private authenticationService: AuthenticationService) {
    this.votacaoAtiva();
  }

  ngOnInit() {
    this.encontrado = false;
    const urnaValidada: any = JSON.parse(localStorage.getItem('Urna'));
    if (urnaValidada) {
      const formData: FormData = new FormData();
      formData.append('Apelido', urnaValidada.UUID);
      formData.append('Senha', urnaValidada.Hash);
      this.authenticationService.loginUrna(formData)
        .pipe(first())
        .subscribe(
          (data) => {
            // localStorage.setItem('Urna', JSON.stringify(data));
          },
          (error) => {
            this.snackBar.open('Dados da Urna não encontrados ou a mesma já está sendo usada', 'Fechar', {
              duration: 2000,
            });
          });
    } else {
      this.openDialog();
    }
  }

  next(next) {
    next.focus();
  }

  previous(prev, curr) {
    this.encontrado = false;
    if (curr.value.length && curr) {
      return;
    } else {
      prev.focus();
      prev.value = '';
    }
  }

  consultaCandidato(curr) {
    if (curr.value.length === 1) {
      const numero = this.renderer.selectRootElement('#primeiroInput').value + this.renderer.selectRootElement('#input2').value + this.renderer.selectRootElement('#input3').value + this.renderer.selectRootElement('#input4').value + this.renderer.selectRootElement('#input5').value;
      if (numero === '00000') {
        const tituloCartao = this.renderer.selectRootElement('#tituloCartao');
        const nomeTitulo = this.renderer.createText('Branco');
        const descricaoTexto = this.renderer.createText('Pressione ENTER para confirmar o voto ou BACKSPACE para apagar os números');
        this.renderer.appendChild(tituloCartao, nomeTitulo);
        const imagemCartao = this.renderer.selectRootElement('#imagem');
        this.renderer.setAttribute(imagemCartao, 'src', 'assets/avatar-placeholder.png');
        const descricaoCard = this.renderer.selectRootElement('#conteudo');
        this.renderer.appendChild(descricaoCard, descricaoTexto);
        this.encontrado = true;
      } else {
      this.getterServices.buscaCandidato(numero)
        .pipe(first())
        .subscribe(
          (data) => {
            const tituloCartao = this.renderer.selectRootElement('#tituloCartao');
            const nomeTitulo = this.renderer.createText(data.Nome);
            const descricaoTexto = this.renderer.createText('Pressione ENTER para confirmar o voto ou BACKSPACE para apagar os números');
            this.renderer.appendChild(tituloCartao, nomeTitulo);
            const imagemCartao = this.renderer.selectRootElement('#imagem');
            if (data.Foto !== undefined && data.Foto.substr(data.Foto.length - 3) !== 'N/A') {
              this.renderer.setAttribute(imagemCartao, 'src', 'http://' + data.Foto);
            } else {
              this.renderer.setAttribute(imagemCartao, 'src', 'assets/avatar-placeholder.png');
            }
            const descricaoCard = this.renderer.selectRootElement('#conteudo');
            this.renderer.appendChild(descricaoCard, descricaoTexto);
            this.encontrado = true;
          },
          (error) => {
            // console.log(error);
            this.snackBar.open('Candidato não encontrado', 'Fechar', {
              duration: 1500,
            });
          });
        }
    } else {
      return;
    }
  }

  salvarVoto() {
    if (this.encontrado === true) {
      this.votacaoAtiva();
    } else {
      this.snackBar.open('Candidato não encontrado', 'Fechar', {
        duration: 1500,
      });
      return;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoUrnaComponent, {
      width: '280px',
      height: '300px',
      data: { Apelido: this.Apelido, Senha: this.Senha },
      backdropClass: 'backdropBackground',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

      } else {
        this.router.navigate(['/']);
      }
    });
  }

  votacaoAtiva() {
    this.getterServices.verificaVotacaoAtivadaVotos()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data === true) {
            const numero = this.renderer.selectRootElement('#primeiroInput').value + this.renderer.selectRootElement('#input2').value + this.renderer.selectRootElement('#input3').value + this.renderer.selectRootElement('#input4').value + this.renderer.selectRootElement('#input5').value;
            if (this.renderer.selectRootElement('#input5').value !== '') {
            this.getterServices.salvarOpcaoVoto(numero)
              .pipe(first())
              .subscribe(
                () => {
                  this.router.navigate(['/teste']);
                },
                (error) => {
                  // console.log(error);
                  this.snackBar.open('Preencha todos os campos', 'Fechar', {
                    duration: 1500,
                  });
                });
              }
          } else {
            localStorage.setItem('mensagem', 'Nenhuma votação em andamento ou fechada para votos!');
            this.router.navigate(['/']);
          }
        },
        (error) => {
        });
  }
}

export interface DadosUrna {
  Apelido: string;
  Senha: string;
}
