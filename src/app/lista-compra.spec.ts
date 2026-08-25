import { TestBed } from '@angular/core/testing';

import { ListaCompra } from './lista-compra';

describe('ListaCompra', () => {
  let service: ListaCompra;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaCompra);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
