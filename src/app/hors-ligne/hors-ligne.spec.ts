import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsLigne } from './hors-ligne';

describe('HorsLigne', () => {
  let component: HorsLigne;
  let fixture: ComponentFixture<HorsLigne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorsLigne],
    }).compileComponents();

    fixture = TestBed.createComponent(HorsLigne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
