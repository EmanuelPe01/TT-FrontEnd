import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaInscripcionesComponent } from './consulta-inscripciones.component';

describe('ConsultaInscripcionesComponent', () => {
  let component: ConsultaInscripcionesComponent;
  let fixture: ComponentFixture<ConsultaInscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaInscripcionesComponent]
    });
    fixture = TestBed.createComponent(ConsultaInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
