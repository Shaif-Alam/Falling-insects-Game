import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallingSquareComponent } from './falling-square.component';

describe('FallingSquareComponent', () => {
  let component: FallingSquareComponent;
  let fixture: ComponentFixture<FallingSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallingSquareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FallingSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
