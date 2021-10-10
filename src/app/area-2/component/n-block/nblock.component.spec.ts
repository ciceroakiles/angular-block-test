import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NBlockComponent } from './nblock.component';

describe('NBlockComponent', () => {
  let component: NBlockComponent;
  let fixture: ComponentFixture<NBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
