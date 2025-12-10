import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhChart } from './ph-chart';

describe('PhChart', () => {
  let component: PhChart;
  let fixture: ComponentFixture<PhChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
