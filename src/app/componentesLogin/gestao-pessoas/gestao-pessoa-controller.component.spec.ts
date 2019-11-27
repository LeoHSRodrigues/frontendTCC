import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoPessoaControllerComponent } from './gestao-pessoa-controller.component';

describe('GestaoPessoaControllerComponent', () => {
  let component: GestaoPessoaControllerComponent;
  let fixture: ComponentFixture<GestaoPessoaControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoPessoaControllerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoPessoaControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
