import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hand } from './hand';

describe('Hand', () => {
  let component: Hand;
  let fixture: ComponentFixture<Hand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
