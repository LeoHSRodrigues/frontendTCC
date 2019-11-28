import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-redirecionador',
  templateUrl: './redirecionador.component.html',
  styleUrls: ['./redirecionador.component.css'],
})
export class RedirecionadorComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const formData: FormData = new FormData();
    formData.append('CPF', localStorage.getItem('VotoMomento'));
    this.authenticationService.atualizarVotacaoPessoa(formData)
    .pipe(first())
    .subscribe(
      () => {
        localStorage.removeItem('VotoMomento');
        setTimeout(() => {
          this.router.navigate(['/votar']);
        }, 5000);
      },
      (error) => {
      });
  }

}
