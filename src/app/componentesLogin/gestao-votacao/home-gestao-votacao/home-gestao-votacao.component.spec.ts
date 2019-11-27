import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGestaoVotacaoComponent } from './home-gestao-votacao.component';

describe('HomeGestaoVotacaoComponent', () => {
  let component: HomeGestaoVotacaoComponent;
  let fixture: ComponentFixture<HomeGestaoVotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGestaoVotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGestaoVotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
