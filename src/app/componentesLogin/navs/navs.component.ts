import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    public router: Router,
    private titleService: Title,
    private getterServices: GetterServices,
    private sanitizer: DomSanitizer,
    ) {
  }

  ngOnInit() {
    this.mobile = false;
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
        this.Foto = this.sanitizer.bypassSecurityTrustUrl('http://' + data.Foto);
        return ;
      },
      (error) => {
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
