import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestaoUrnaNovoComponent } from './form-gestao-urna-novo.component';

describe('FormGestaoUrnaNovoComponent', () => {
  let component: FormGestaoUrnaNovoComponent;
  let fixture: ComponentFixture<FormGestaoUrnaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestaoUrnaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestaoUrnaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
