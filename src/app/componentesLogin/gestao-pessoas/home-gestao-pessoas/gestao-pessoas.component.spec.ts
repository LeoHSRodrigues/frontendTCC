import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoPessoasComponent } from './gestao-pessoas.component';

describe('GestaoPessoasComponent', () => {
  let component: GestaoPessoasComponent;
  let fixture: ComponentFixture<GestaoPessoasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoPessoasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
