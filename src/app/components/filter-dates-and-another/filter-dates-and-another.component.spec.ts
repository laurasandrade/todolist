import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDatesAndAnotherComponent } from './filter-dates-and-another.component';

describe('FilterDatesAndAnotherComponent', () => {
  let component: FilterDatesAndAnotherComponent;
  let fixture: ComponentFixture<FilterDatesAndAnotherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDatesAndAnotherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDatesAndAnotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
