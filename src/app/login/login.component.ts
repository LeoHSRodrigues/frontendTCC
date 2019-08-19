import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Validacoes } from './validacoes';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  loginForm;
  param1: string;

  get CPF() { return this.loginForm.get('CPF'); }
  get Senha() { return this.loginForm.get('Senha'); }
  get f() { return this.loginForm.controls; }


  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private router: Router,
              public snackBar: MatSnackBar,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute ) {

    this.loginForm = this.formBuilder.group({
      CPF: ['', Validators.compose([Validators.required, Validators.minLength(11), Validacoes])],
      Senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      Lembrar: false
    });

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }



  onSubmit() {
    this.authenticationService.login(this.f.CPF.value, this.f.Senha.value)
      .pipe(first())
      .subscribe(
        data => {
          if (this.route.snapshot.queryParamMap.get('returnUrl')) {
            this.router.navigate([this.route.snapshot.queryParamMap.get('returnUrl')]).then(() => {
              window.location.reload();
            });
          } else {
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }
        },
        error => {
          this.snackBar.open('CPF ou Senha incorreto', 'Fechar', {
            duration: 2000
          });
        });
  }
}
