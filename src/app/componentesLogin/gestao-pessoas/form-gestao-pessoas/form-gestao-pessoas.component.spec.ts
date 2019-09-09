import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestaoPessoasComponent } from './form-gestao-pessoas.component';

describe('FormGestaoPessoasComponent', () => {
  let component: FormGestaoPessoasComponent;
  let fixture: ComponentFixture<FormGestaoPessoasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestaoPessoasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestaoPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
