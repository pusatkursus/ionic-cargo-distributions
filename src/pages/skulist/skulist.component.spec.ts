import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkulistComponent } from './skulist.component';

describe('SkulistComponent', () => {
  let component: SkulistComponent;
  let fixture: ComponentFixture<SkulistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkulistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
