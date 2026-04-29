import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Surveyslist } from './surveyslist';

describe('Surveyslist', () => {
  let component: Surveyslist;
  let fixture: ComponentFixture<Surveyslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Surveyslist],
    }).compileComponents();

    fixture = TestBed.createComponent(Surveyslist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
