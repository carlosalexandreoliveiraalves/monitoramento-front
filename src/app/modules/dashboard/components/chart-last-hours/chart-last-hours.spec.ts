import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLastHours } from './chart-last-hours';

describe('ChartLastHours', () => {
  let component: ChartLastHours;
  let fixture: ComponentFixture<ChartLastHours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartLastHours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartLastHours);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
