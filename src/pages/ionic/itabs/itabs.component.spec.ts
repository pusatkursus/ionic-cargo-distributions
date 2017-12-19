import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItabsComponent } from './itabs.component';

describe('ItabsComponent', () => {
  let component: ItabsComponent;
  let fixture: ComponentFixture<ItabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
