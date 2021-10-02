import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBlockComponent } from './pblock.component';

describe('BlockTestComponent', () => {
  let component: PBlockComponent;
  let fixture: ComponentFixture<PBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
