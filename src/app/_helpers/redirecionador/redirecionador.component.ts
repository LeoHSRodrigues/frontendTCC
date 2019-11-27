import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirecionador',
  templateUrl: './redirecionador.component.html',
  styleUrls: ['./redirecionador.component.css'],
})
export class RedirecionadorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/votar']);
    }, 5000);
  }

}
