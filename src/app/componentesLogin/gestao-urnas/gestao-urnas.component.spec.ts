import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoUrnasComponent } from './gestao-urnas.component';

describe('GestaoUrnasComponent', () => {
  let component: GestaoUrnasComponent;
  let fixture: ComponentFixture<GestaoUrnasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoUrnasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoUrnasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
