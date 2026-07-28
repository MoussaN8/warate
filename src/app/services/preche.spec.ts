import { TestBed } from '@angular/core/testing';

import { Preche } from './preche';

describe('Preche', () => {
  let service: Preche;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Preche);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
