import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTestComponent1 } from './block-test.component';

describe('BlockTestComponent1', () => {
  let component: BlockTestComponent1;
  let fixture: ComponentFixture<BlockTestComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockTestComponent1 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTestComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
