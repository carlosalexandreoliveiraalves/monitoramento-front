import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbChart } from './turb-chart';

describe('TurbChart', () => {
  let component: TurbChart;
  let fixture: ComponentFixture<TurbChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurbChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurbChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
