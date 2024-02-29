import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaInscripcionComponent } from './nueva-inscripcion.component';

describe('NuevaInscripcionComponent', () => {
  let component: NuevaInscripcionComponent;
  let fixture: ComponentFixture<NuevaInscripcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaInscripcionComponent]
    });
    fixture = TestBed.createComponent(NuevaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
