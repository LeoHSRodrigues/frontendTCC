import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { GetterServices } from '../_services/getters.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private getterServices: GetterServices,
        private http: HttpClient,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(currentUser.token);
            const expirationDate = helper.getTokenExpirationDate(currentUser.token);
            if (isExpired === true) {
                this.authenticationService.logout();
                this.router.navigate(['/login']);
            } else {
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {

        return this.http.get<any>(`http://127.0.0.1:8000/api/verificaVotacaoAtivada`)
            .pipe(map((votacao) => {
                if (votacao) {
                    if (votacao.Status === 'Iniciada' || votacao.Status === 'Contagem') {
                        this.router.navigate(['/']);
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }));
    }
}
