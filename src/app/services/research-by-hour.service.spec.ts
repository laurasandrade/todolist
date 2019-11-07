import { TestBed } from "@angular/core/testing";

import { ResearchByHourService } from "./research-by-hour.service";

describe("ResearchByHourService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ResearchByHourService = TestBed.get(ResearchByHourService);
    expect(service).toBeTruthy();
  });
});
