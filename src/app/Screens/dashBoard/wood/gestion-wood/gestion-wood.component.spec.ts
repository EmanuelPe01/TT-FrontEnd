import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionWoodComponent } from './gestion-wood.component';

describe('GestionWoodComponent', () => {
  let component: GestionWoodComponent;
  let fixture: ComponentFixture<GestionWoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionWoodComponent]
    });
    fixture = TestBed.createComponent(GestionWoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
