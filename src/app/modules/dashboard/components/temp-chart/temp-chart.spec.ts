import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempChart } from './temp-chart';

describe('TempChart', () => {
  let component: TempChart;
  let fixture: ComponentFixture<TempChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
