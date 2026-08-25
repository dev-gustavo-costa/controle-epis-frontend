import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoEpis } from './deposito-epis';

describe('DepositoEpis', () => {
  let component: DepositoEpis;
  let fixture: ComponentFixture<DepositoEpis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositoEpis],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositoEpis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
