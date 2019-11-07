import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ListaRespostasService } from "src/app/services/listaRespostas.service";
import { PaginationInstance } from "ngx-pagination";
import { PollService } from "src/app/services/poll.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Utils } from "../../shared/utils";
import * as jsPDF from "jspdf";

@Component({
  selector: "app-answers-list",
  templateUrl: "./answers-list.component.html",
  styleUrls: ["./answers-list.component.scss"]
})
// tslint:disable-next-line:component-class-suffix
export class AnswersListPage implements OnInit {
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

  @Input() itemsPerPage = 20;
  @Input() columnsName: string[] = [];
  @Output() changedPage = new EventEmitter<any>();
  loadingData = false;

  offSet: any = 0;
  limit: any = 5;

  private config: PaginationInstance;

  noShowFilterFields: undefined;

  @ViewChild("content", {
    read: null,
    static: false
  })
  content: ElementRef;

  constructor(
    private listaRespostasService: ListaRespostasService,
    private pollService: PollService
  ) {}

  makeReport() {
    if (this.localBranch !== undefined) {
      this.listaRespostasService
        .getCsv({
          branch: this.localBranch,
          startDate: Utils.prepareDate(this.startDate),
          endDate: Utils.prepareDate(this.endDate),
          startHourByShift: this.startHour,
          endHourByShift: this.endHour,
          startMinByShift: this.startMinutes,
          endMinByShift: this.endMinutes,
          daysOfWeek: this.daysOfWeek,
          poll: this.localPoll,
          offSet: 0,
          limit: 1000000000
        })
        .subscribe(data => {
          this.buildLinkDownloadCvs(data);
        });
    }
  }

  buildLinkDownloadCvs(data: any) {
    const blob = new Blob([data], { type: "application/csv" });
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    const myDateTime = new Date(new Date());
    const nameDownloadedFile = [
      myDateTime.getFullYear(),
      ("0" + (myDateTime.getMonth() + 1)).slice(-2),
      myDateTime.getDate(),
      myDateTime.getHours(),
      myDateTime.getMinutes(),
      myDateTime.getSeconds(),
      "_lista_respostas.csv"
    ].join("");
    link.download = nameDownloadedFile;
    link.href = downloadURL;
    link.click();
  }

  makeRequest() {
    if (this.localBranch !== undefined) {
      this.pollService.byBranch(this.localBranch).subscribe(polls => {
        this.polls = polls.items;
      });
      this.listaRespostasService
        .get({
          branch: this.localBranch,
          startDate: Utils.prepareDate(this.startDate),
          endDate: Utils.prepareDate(this.endDate),
          startHourByShift: this.startHour,
          endHourByShift: this.endHour,
          startMinByShift: this.startMinutes,
          endMinByShift: this.endMinutes,
          daysOfWeek: this.daysOfWeek,
          poll: this.localPoll,
          offSet: this.offSet,
          limit: this.limit
        })
        .pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe(rows => {
          this.rows = rows["items"].sessions;
          this.receiveServer(this.rows, this.offSet, this.limit, rows["total"]);
        });
    }
  }

  ngOnInit() {
    this.makeRequest();

    this.config = {
      id: "paginatorAnswers",
      itemsPerPage: 5,
      currentPage: 0,
      totalItems: 0
    };
  }

  dateRangeChange() {
    this.makeRequest();
  }

  onBranchChange(branch: string) {
    this.localBranch = branch;
    this.makeRequest();
  }

  trataPergunta(valor) {
    return valor.map(answer => answer.description).join(", ");
  }

  receiveServer(rows: object[], offset: number, limit: number, total: number) {
    this.loadingData = false;
    this.rows = rows;
    if (total === 0) {
      this.config = {
        id: "paginatorAnswers",
        itemsPerPage: this.config.itemsPerPage,
        currentPage: Math.round(this.itemsPerPage),
        totalItems: total
      };
    } else {
      this.config = {
        id: "paginatorAnswers",
        itemsPerPage: limit,
        currentPage: Math.round(offset / limit + 1),
        totalItems: total
      };
    }
  }

  onChangePage(event) {
    this.loadingData = true;
    this.config.currentPage = Math.round(event);
    this.offSet = (this.config.currentPage - 1) * this.config.itemsPerPage;
    if (this.offSet > 0 && this.config.itemsPerPage > 1) {
      this.offSet = this.offSet - 1;
    }
    this.makeRequest();
    this.changedPage.emit(this.config);
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
