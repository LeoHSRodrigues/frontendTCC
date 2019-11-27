import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGestaoUrnaNovoComponent } from './home-gestao-urna.component';

describe('HomeGestaoUrnaNovoComponent', () => {
  let component: HomeGestaoUrnaNovoComponent;
  let fixture: ComponentFixture<HomeGestaoUrnaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGestaoUrnaNovoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGestaoUrnaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
