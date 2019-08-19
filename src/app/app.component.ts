import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class AppComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    public router: Router,
    public rotas: RouterModule,
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
