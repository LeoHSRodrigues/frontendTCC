import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestaoVotacaoEditarComponent } from './form-gestao-votacao-editar.component';

describe('FormGestaoVotacaoEditarComponent', () => {
  let component: FormGestaoVotacaoEditarComponent;
  let fixture: ComponentFixture<FormGestaoVotacaoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestaoVotacaoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestaoVotacaoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
