import { TestBed } from '@angular/core/testing';
import { Candidatos } from './candidatos';

describe('Candidatos', () => {
  let service: Candidatos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Candidatos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
