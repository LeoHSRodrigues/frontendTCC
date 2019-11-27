import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestaoVotacaoNovoComponent } from './form-gestao-votacao-novo.component';

describe('FormGestaoVotacaoNovoComponent', () => {
  let component: FormGestaoVotacaoNovoComponent;
  let fixture: ComponentFixture<FormGestaoVotacaoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestaoVotacaoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestaoVotacaoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
