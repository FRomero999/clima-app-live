import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityNewNgmodel } from './city-new-ngmodel';

describe('CityNewNgmodel', () => {
  let component: CityNewNgmodel;
  let fixture: ComponentFixture<CityNewNgmodel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityNewNgmodel],
    }).compileComponents();

    fixture = TestBed.createComponent(CityNewNgmodel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
