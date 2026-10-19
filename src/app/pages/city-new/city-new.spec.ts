import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityNew } from './city-new';

describe('CityNew', () => {
  let component: CityNew;
  let fixture: ComponentFixture<CityNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityNew],
    }).compileComponents();

    fixture = TestBed.createComponent(CityNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
