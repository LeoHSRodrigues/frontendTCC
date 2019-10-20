import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { GetterServices } from '../_services/getters.service';

@Injectable({
  providedIn: 'root',
})
export class VerificaVotacaoAtivaGuard implements CanLoad {

  constructor(private getterServices: GetterServices) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      this.getterServices.verificaVotacaoAtivada().pipe(first())
      .subscribe(
        (data) => {
          if (data.Status === 'Iniciada') {
            return true;
          } else {
            return false;
          }
        },
        (error) => {
          console.log(error);
        });
      return true;
  }

}
