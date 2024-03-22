import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependienteComponent } from './dependiente.component';

describe('DependienteComponent', () => {
  let component: DependienteComponent;
  let fixture: ComponentFixture<DependienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependienteComponent]
    });
    fixture = TestBed.createComponent(DependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
