import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityNewSignalForm } from './city-new-signal-form';

describe('CityNewSignalForm', () => {
  let component: CityNewSignalForm;
  let fixture: ComponentFixture<CityNewSignalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityNewSignalForm],
      // El componente inyecta Router, así que el test necesita el router de Angular.
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CityNewSignalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
