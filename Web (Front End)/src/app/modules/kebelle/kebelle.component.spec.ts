import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KebelleComponent } from './kebelle.component';

describe('KebelleComponent', () => {
  let component: KebelleComponent;
  let fixture: ComponentFixture<KebelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KebelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KebelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
