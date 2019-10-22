import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoUrnaComponent } from './dialogo-urna.component';

describe('DialogoUrnaComponent', () => {
  let component: DialogoUrnaComponent;
  let fixture: ComponentFixture<DialogoUrnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoUrnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoUrnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
