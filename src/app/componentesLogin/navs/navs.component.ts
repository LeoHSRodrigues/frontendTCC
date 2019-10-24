import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GetterServices } from 'src/app/_services/getters.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.css'],
})
export class ComponentesnavsComponent implements OnInit {

  Nome: string;
  Foto: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
  .pipe(
    map((result) => result.matches),
    shareReplay(),
  );
  mobile: boolean;

  title: string;
  votacaoAtivada: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    public router: Router,
    private titleService: Title,
    private getterServices: GetterServices,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    ) {
  }

  ngOnInit() {
    this.mobile = false;
    this.verificaAdmin();
    this.votacaoAtiva();
    window.onresize = () => this.mobile = window.innerWidth <= 800;
    if (window.screen.width <= 800) { // 768px portrait
      this.mobile = true;
    }
    const values = JSON.parse(localStorage.getItem('usuario'));
    this.buscarPessoa(values.CPF);
  }
  buscarPessoa(id) {
    this.getterServices.buscarPessoaNav(id)
    .pipe(first())
    .subscribe(
      (data) => {
        this.Nome = data.Nome;
        if (data.Foto !== undefined) {
          this.Foto = this.sanitizer.bypassSecurityTrustUrl('http://' + data.Foto);
        } else {
          this.Foto = undefined;
        }
        return ;
      },
      (error) => {
      });
  }

  verificaAdmin() {
    const admin = this.authenticationService.currentUserValue;
  }

  votacaoAtiva() {
    this.getterServices.verificaVotacaoAtivada()
    .pipe(first())
    .subscribe(
      (data) => {
        this.votacaoAtivada = data;
      },
      (error) => {
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
