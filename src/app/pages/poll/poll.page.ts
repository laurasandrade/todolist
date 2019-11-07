import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterContentInit
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { PollService } from "../../services/poll.service";
import { User } from "../../models/user";
import { Pagination } from "../../models/pagination";
import { Poll } from "../../models/poll";

import { Navigator } from "../../helpers/navigator";
import { GlobalConfig, ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

import { TableListComponent } from "src/app/components/table-list/table-list.component";

import { PaginationInstance } from "ngx-pagination";
import { BehaviorSubject } from "rxjs";
import { TableListColumn } from "src/app/components/table-list/model/table-list-column";
@Component({
  // tslint:disable-next-line:component-selector
  selector: "search-poll",
  templateUrl: "./poll.component.html",
  styleUrls: ["./poll.component.scss"],
  providers: [PollService]
})

// tslint:disable-next-line:component-class-suffix
export class PollPage implements OnInit, AfterViewInit {
  user: User = null;
  //offset = 0;
  itemsPerPage = environment.pagination.itemsPerPage;
  //columns: string[] = ['branch', 'name', 'customer','operacao'];
  columns: TableListColumn[] = [
    { type: "text", value: "branch", description: "", URL: "", format: "" },
    { type: "text", value: "name", description: "", URL: "", format: "" },
    { type: "text", value: "customer", description: "", URL: "", format: "" },
    {
      type: "link",
      value: "branch",
      description: "Relatório",
      URL: "/report/$LINK$",
      format: ""
    }
  ];
  columnsName: string[] = ["Filial", "Descrição", "Cliente"];
  operations = [
    { type: "link", url: "/#/report/$branch$", header: "headercoluna" }
  ];
  messageConf: Partial<GlobalConfig> = environment.messagesConf as GlobalConfig;
  message = "";
  titlePage = "Todas as pesquisas";
  searchTerm$ = new BehaviorSubject<string>("");

  @ViewChild("tabelaList", { static: false }) tabelaList: TableListComponent;

  constructor(
    private authService: AuthService,
    private pollService: PollService,
    private toastr: ToastrService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    if (!this.user.hasPermission("polls:read")) {
      Navigator.navigateToLogin();
    }
    this.searchTerm$
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(s => {
        this.loadPolls(0, this.itemsPerPage, this.searchTerm$.getValue());
      });
  }

  ngAfterViewInit() {
    this.tabelaList.changedPage.subscribe((evt: PaginationInstance) => {
      let offset = (evt.currentPage - 1) * evt.itemsPerPage;
      if (offset > 0 && evt.itemsPerPage > 1) {
        offset = offset - 1;
      }

      this.loadPolls(offset, evt.itemsPerPage, this.searchTerm$.getValue());
    });

    this.loadPolls(0, this.itemsPerPage, this.searchTerm$.getValue());
  }

  loadPolls(offset: number, limit: number, name = null) {
    this.pollService.search(offset, limit, name).subscribe(
      (response: Pagination<Poll>) => {
        this.tabelaList.receiveServer(
          response.items,
          response.offset,
          response.limit,
          response.total
        );
      },
      (response: HttpErrorResponse) => {
        this.message = "Não foi possível realizar a pesquisa.";
        this.toastr.error(this.titlePage, this.message, this.messageConf);
      }
    );
  }

  // navigateTo(row: any) {
  //   this.router.navigate(['/devices/data/' +  row.id]);
  // }
}
