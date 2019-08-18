import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class AppComponent {

  constructor(private authenticationService: AuthenticationService, public router: Router, public rotas: RouterModule) {
  }
  title = 'frontendtcc';

  logout(){
    this.authenticationService.logout()
    this.router.navigate(['/login'])
  }
}