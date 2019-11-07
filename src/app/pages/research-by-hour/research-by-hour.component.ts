import { Component, OnInit } from '@angular/core';
import { ResearchByHourService } from 'src/app/services/research-by-hour.service';
import { PollService } from 'src/app/services/poll.service';
import { Utils } from '../../shared/utils';

@Component({
  selector: 'app-research-by-hour',
  templateUrl: './research-by-hour.component.html',
  styleUrls: ['./research-by-hour.component.scss']
})
export class ResearchByHourComponent implements OnInit {
  rows: any;
  localBranch: string;
  polls: Array<any>;
  localPoll: string;
  title: string;
  blob: Blob;
  startDate: any = new Date(
    new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000
  );
  noShowFilterFields: Array<string> = ['hour', 'daysOfWeek'];
  endDate: any = new Date();

  constructor(
    private researchByHourService: ResearchByHourService,
    private pollService: PollService
  ) {}

  ngOnInit() {
    this.makeRequest();
  }

  onBranchChange(branch: string) {
    this.localBranch = branch;
    this.makeRequest();
  }

  onPollChange(poll: any) {
    this.localPoll = poll;
    this.makeRequest();
  }

  makeReport() {
    if (this.localBranch !== undefined) {
      this.researchByHourService
        .getPdf({
          branch: this.localBranch,
          poll: this.localPoll,
          startDate: Utils.prepareDate(this.startDate),
          endDate: Utils.prepareDate(this.endDate)
        })
        .subscribe(data => {
          this.buildLinkDownloadPdf(data);
        });
    }
  }

  buildLinkDownloadPdf(data: any) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    const myDateTime = Utils.prepareDateTimeReverse(new Date(new Date()));
    const nameDownloadedFile = [myDateTime, '_por_horarios.pdf'].join('');
    link.download = nameDownloadedFile;
    link.href = downloadURL;
    link.click();
  }

  makeRequest() {
    if (this.localBranch !== undefined) {
      this.pollService.byBranch(this.localBranch).subscribe(polls => {
        this.polls = polls.items;
      });
      this.title =
        this.polls && this.polls[0] !== undefined ? this.polls[0].name : '';
      this.researchByHourService
        .get({
          branch: this.localBranch,
          poll: this.localPoll,
          startDate: Utils.prepareDate(this.startDate),
          endDate: Utils.prepareDate(this.endDate)
        })
        .subscribe(rows => {
          this.rows = rows.items.rows;
        });
    }
  }
  onStartDateChange(date: any) {
    this.startDate = date;
    this.makeRequest();
  }

  onEndDateChange(date: any) {
    this.endDate = date;
    this.makeRequest();
  }
}
