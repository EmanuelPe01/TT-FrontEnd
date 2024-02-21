import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenControllerComponent } from './screen-controller.component';

describe('ScreenControllerComponent', () => {
  let component: ScreenControllerComponent;
  let fixture: ComponentFixture<ScreenControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenControllerComponent]
    });
    fixture = TestBed.createComponent(ScreenControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
