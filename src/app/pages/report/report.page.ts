import { Component, OnInit, Input } from "@angular/core";
import { ConsolidadoService } from "src/app/services/consolidado.service";

import { PollService } from "src/app/services/poll.service";
import { Utils } from "../../shared/utils";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
// tslint:disable-next-line:component-class-suffix
export class ReportPage implements OnInit {
  // startDate = new FormControl({
  //   value: new Date(new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000),
  //   disabled: true
  // });
  // endDate = new FormControl({ value: new Date(), disabled: true });
  // limitMaxStartDate: any;
  // limitMaxEndDate: any;
  rows: any;
  localBranch: string;
  polls: Array<any>;
  localPoll: string;

  startDate: any = new Date(
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000
  );
  endDate: any = new Date();
  startHour: any = 0;
  endHour: any = 23;
  startMinutes: any = 0;
  endMinutes: any = 59;
  daysOfWeek: Array<number>;
  noShowFilterFields: undefined;

  backgroundColorArrayOpiniaoSatisfeito: Array<string> = [
    "#75D6A2",
    "#7DE3DB",
    "#FFDD00",
    "#FDAA24",
    "#FF7B7C"
  ];

  constructor(
    private consolidadoService: ConsolidadoService,
    private pollService: PollService
  ) {}

  ngOnInit() {
    this.makeRequest();
    this.onBranchChange(this.localBranch);
  }

  dateRangeChange() {
    this.makeRequest();
  }

  onBranchChange(branch: string) {
    this.localBranch = branch;
    this.makeRequest();
  }

  async makeRequest() {
    if (this.localBranch !== undefined) {
      await this.pollService
        .byBranch(this.localBranch)
        .subscribe(polls => (this.polls = polls.items));

      await this.consolidadoService
        .get({
          branch: this.localBranch,
          startDate: Utils.prepareDate(this.startDate),
          endDate: Utils.prepareDate(this.endDate),
          startHourByShift: this.startHour,
          endHourByShift: this.endHour,
          startMinByShift: this.startMinutes,
          endMinByShift: this.endMinutes,
          daysOfWeek: this.daysOfWeek,
          poll: this.localPoll
        })
        .subscribe(rows => {
          this.rows = rows;
        });
    }
  }

  async makeReport() {
    if (this.localBranch !== undefined) {
      await this.consolidadoService
        .getPdf({
          branch: this.localBranch,
          startDate: Utils.prepareDate(this.startDate),
          endDate: Utils.prepareDate(this.endDate),
          startHourByShift: this.startHour,
          endHourByShift: this.endHour,
          startMinByShift: this.startMinutes,
          endMinByShift: this.endMinutes,
          daysOfWeek: this.daysOfWeek,
          poll: this.localPoll
        })
        .subscribe(data => {
          this.buildLinkDownloadPdf(data);
        });
    }
  }
  buildLinkDownloadPdf(data: any) {
    const blob = new Blob([data], { type: "application/pdf" });
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    const myDateTime = Utils.prepareDateTimeReverse(new Date(new Date()));
    const nameDownloadedFile = [myDateTime, "_consolidated.pdf"].join("");
    link.download = nameDownloadedFile;
    link.href = downloadURL;
    link.click();
  }

  onStartDateChange(date: any) {
    this.startDate = date;
    this.makeRequest();
  }

  onEndDateChange(date: any) {
    this.endDate = date;
    this.makeRequest();
  }

  onStartHourChange(hour: any) {
    this.startHour = hour;
    this.makeRequest();
  }

  onStartMinutesChange(minutes: any) {
    this.startMinutes = minutes;
    this.makeRequest();
  }

  onEndHourChange(hour: any) {
    this.endHour = hour;
    this.makeRequest();
  }

  onEndMinutesChange(minutes: any) {
    this.endMinutes = minutes;
    this.makeRequest();
  }

  onDaysOfWeekChange(days: any) {
    this.daysOfWeek = days;
    this.makeRequest();
  }
  onPollChange(poll: any) {
    this.localPoll = poll;
    this.makeRequest();
  }
}
