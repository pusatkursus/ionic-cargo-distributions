import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripmapComponent } from './tripmap.component';

describe('TripmapComponent', () => {
  let component: TripmapComponent;
  let fixture: ComponentFixture<TripmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
