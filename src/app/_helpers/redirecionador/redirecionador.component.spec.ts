import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirecionadorComponent } from './redirecionador.component';

describe('RedirecionadorComponent', () => {
  let component: RedirecionadorComponent;
  let fixture: ComponentFixture<RedirecionadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirecionadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirecionadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
