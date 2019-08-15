import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from "@angular/router"
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { User } from '../_models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentUser: Observable<User>;
  
  constructor(private router: Router, private authenticationService: AuthenticationService, ) {

    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(currentUser.token);
        //  const expirationDate = helper.getTokenExpirationDate(currentUser.token);
        if (isExpired == true){
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }
      }
      else{
        this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
