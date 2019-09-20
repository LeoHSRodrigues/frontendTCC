import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.css'],
})
export class ComponentesnavsComponent implements OnInit {

  Nome: string;

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
    ) {
  }

  ngOnInit() {
    this.mobile = false;
    window.onresize = () => this.mobile = window.innerWidth <= 800;
    if (window.screen.width <= 800) { // 768px portrait
      this.mobile = true;
    }
    const values = JSON.parse(localStorage.getItem('usuario'));
    this.Nome = values.Nome;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
