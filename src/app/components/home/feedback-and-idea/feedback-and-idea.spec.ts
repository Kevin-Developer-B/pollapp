import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAndIdea } from './feedback-and-idea';

describe('FeedbackAndIdea', () => {
  let component: FeedbackAndIdea;
  let fixture: ComponentFixture<FeedbackAndIdea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackAndIdea],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackAndIdea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
