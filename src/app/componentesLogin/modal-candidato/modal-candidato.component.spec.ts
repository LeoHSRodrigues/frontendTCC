import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCandidatoComponent } from './modal-candidato.component';

describe('ModalCandidatoComponent', () => {
  let component: ModalCandidatoComponent;
  let fixture: ComponentFixture<ModalCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
