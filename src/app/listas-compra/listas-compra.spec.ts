import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ListasCompra } from './listas-compra';

describe('ListasCompra', () => {
  let component: ListasCompra;
  let fixture: ComponentFixture<ListasCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasCompra],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListasCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
