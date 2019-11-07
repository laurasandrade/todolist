import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResearchByHourComponent } from "./research-by-hour.component";

describe("ResearchByHourComponent", () => {
  let component: ResearchByHourComponent;
  let fixture: ComponentFixture<ResearchByHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchByHourComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchByHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
