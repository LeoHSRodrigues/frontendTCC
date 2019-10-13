import { Component, OnInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.css'],
})
export class VotarComponent implements OnInit {
  items: string[] = ['item1', 'item2', 'item3'];
  constructor() { }

  ngOnInit() {

  }
}
