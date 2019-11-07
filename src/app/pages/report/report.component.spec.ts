import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReportPage } from "./report.page";

describe("ReportComponent", () => {
  let component: ReportPage;
  let fixture: ComponentFixture<ReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportPage]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
