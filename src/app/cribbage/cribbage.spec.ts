import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cribbage } from './cribbage';

describe('Cribbage', () => {
  let component: Cribbage;
  let fixture: ComponentFixture<Cribbage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cribbage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cribbage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
