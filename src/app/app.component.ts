import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { Title } from '@angular/platform-browser';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    public router: Router,
    private titleService: Title
    ) {
  }
  mobile: boolean;

  title: string;

  ngOnInit() {
    this.mobile = false;
    window.onresize = () => this.mobile = window.innerWidth <= 800;
    if (window.screen.width <= 800) { // 768px portrait
      this.mobile = true;
    }
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
