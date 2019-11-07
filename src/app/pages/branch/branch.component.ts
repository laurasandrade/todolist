import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
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
import { MatDialog, MatDialogRef } from "@angular/material";
import { ModalBranchComponent } from "./modal-branch.component";
import { BranchService } from "src/app/services/branch.service";
import { Branch } from "src/app/models/branch";

@Component({
  selector: "search-poll",
  templateUrl: "./branch.component.html",
  styleUrls: ["./branch.component.scss"],
  providers: [PollService]
})
export class BranchComponent implements OnInit, AfterViewInit {
  user: User = null;
  offset = 0;
  itemsPerPage = 20;
  columns: TableListColumn[] = [
    { type: "text", value: "id", description: "", URL: "", format: "" },
    { type: "text", value: "name", description: "", URL: "", format: "" },
    {
      type: "text",
      value: "customer",
      description: "",
      URL: "",
      format: ""
    }
  ];
  columnsName: string[] = ["Unidade", "Name", "Cliente"];
  messageConf: Partial<GlobalConfig> = environment.messagesConf as GlobalConfig;
  message = "";
  titlePage = "Todas as pesquisas";
  searchTerm$ = new BehaviorSubject<string>("");

  @ViewChild("tabelaList", { static: false }) tabelaList: TableListComponent;

  fileNameDialogRef: MatDialogRef<ModalBranchComponent>;

  constructor(
    private authService: AuthService,
    private branchService: BranchService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    if (!this.user.hasPermission("branches:read")) {
      Navigator.navigateToLogin();
    }
    this.searchTerm$
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(s => {
        this.loadBranchs(0, this.itemsPerPage, this.searchTerm$.getValue());
      });
  }

  openFileDialog(file?) {
    this.fileNameDialogRef = this.dialog.open(ModalBranchComponent, {});
  }

  ngAfterViewInit() {
    this.tabelaList.changedPage.subscribe((evt: PaginationInstance) => {
      let offset = (evt.currentPage - 1) * evt.itemsPerPage;
      if (offset > 0 && evt.itemsPerPage > 1) {
        offset = offset - 1;
      }

      this.loadBranchs(offset, evt.itemsPerPage, this.searchTerm$.getValue());
    });

    this.loadBranchs(
      this.offset,
      this.itemsPerPage,
      this.searchTerm$.getValue()
    );
  }

  loadBranchs(offset: number, limit: number, name = null) {
    const params = {
      offset,
      limit,
      name: name
    };
    this.branchService.search(params).subscribe(
      (response: Pagination<Branch>) => {
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
}
