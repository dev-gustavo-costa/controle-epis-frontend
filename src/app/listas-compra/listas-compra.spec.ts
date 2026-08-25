import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasCompra } from './listas-compra';

describe('ListasCompra', () => {
  let component: ListasCompra;
  let fixture: ComponentFixture<ListasCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(ListasCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
