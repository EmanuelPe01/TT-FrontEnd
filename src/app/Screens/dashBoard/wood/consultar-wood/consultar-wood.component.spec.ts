import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarWoodComponent } from './consultar-wood.component';

describe('ConsultarWoodComponent', () => {
  let component: ConsultarWoodComponent;
  let fixture: ComponentFixture<ConsultarWoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarWoodComponent]
    });
    fixture = TestBed.createComponent(ConsultarWoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
