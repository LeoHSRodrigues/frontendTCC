import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Validacoes } from 'src/app/componentesSemLogin/login/validacoes';

@Component({
  selector: 'app-modal-candidato',
  templateUrl: './modal-candidato.component.html',
  styleUrls: ['./modal-candidato.component.css'],
})
export class ModalCandidatoComponent implements OnInit {

  formulario: FormGroup;
  private nomeReadOnly: boolean;
  private cpfReadOnly: boolean;
  private tipoPerfil: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalCandidatoComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any , private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {
      this.nomeReadOnly = true;
      this.cpfReadOnly = true;
    }

  onNoClick(): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Nome: [''],
      CPF: [''],
      Numero: ['', [Validators.required, Validators.maxLength(5)]],
    });
    this.formulario.controls.Nome.setValue(this.dados.Nome);
    this.formulario.controls.CPF.setValue(this.dados.CPF);
    this.formulario.controls.Numero.setValue(this.dados.Numero);
    if (this.dados.Tipo === 'Novo') {
      this.tipoPerfil = false;
    } else {
      this.tipoPerfil = true;
    }
  }

  cadastrarCandidato(formulario) {
    if (this.formulario.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('Nome', formulario.Nome);
    formData.append('CPF', formulario.CPF);
    formData.append('Numero', formulario.Numero);
    this.authenticationService.cadastroCandidato(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          this.dialogRef.close('Sucesso');
        },
        (error) => {
          this.snackBar.open('Número já cadastrado', 'Fechar', {
            duration: 2000,
          });
        });
  }

  atualizarCandidato(formulario) {
    if (this.formulario.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('Nome', formulario.Nome);
    formData.append('CPF', formulario.CPF);
    formData.append('Numero', formulario.Numero);
    this.authenticationService.atualizarCandidato(formData)
      .pipe(first())
      .subscribe(
        (data) => {
        this.dialogRef.close('Sucesso');
        },
        (error) => {
          this.snackBar.open('Número já cadastrado', 'Fechar', {
            duration: 2000,
          });
        });
  }

}
