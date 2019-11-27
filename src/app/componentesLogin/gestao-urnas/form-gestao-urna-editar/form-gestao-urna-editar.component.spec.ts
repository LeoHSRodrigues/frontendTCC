import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestaoUrnaEditarComponent } from './form-gestao-urna-editar.component';

describe('FormGestaoUrnaEditarComponent', () => {
  let component: FormGestaoUrnaEditarComponent;
  let fixture: ComponentFixture<FormGestaoUrnaEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestaoUrnaEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestaoUrnaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
