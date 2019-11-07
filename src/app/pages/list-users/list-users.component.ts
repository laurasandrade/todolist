import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user";
import { Pagination } from "../../models/pagination";

import { Navigator } from "../../helpers/navigator";
import { GlobalConfig, ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

import { TableListComponent } from "src/app/components/table-list/table-list.component";

import { PaginationInstance } from "ngx-pagination";
import { BehaviorSubject } from "rxjs";
import { TableListColumn } from "src/app/components/table-list/model/table-list-column";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"]
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  user: User = null;
  offset = 0;
  itemsPerPage = 20;
  columns: TableListColumn[] = [
    { type: "text", value: "name", description: "", URL: "", format: "" },
    { type: "text", value: "email", description: "", URL: "", format: "" },
    { type: "text", value: "group", description: "", URL: "", format: "" },
    { type: "link", value: "branch", description: "", URL: "", format: "" },
    { type: "text", value: "updatedAt", description: "", URL: "", format: "" },
    { type: "text", value: "active", description: "", URL: "", format: "" }
  ];
  columnsName: string[] = [
    "Nome",
    "E-mail",
    "Grupo",
    "Branch",
    "Update",
    "Active"
  ];
  messageConf: Partial<GlobalConfig> = environment.messagesConf as GlobalConfig;
  message = "";
  titlePage = "Todas as pesquisas";
  searchTerm$ = new BehaviorSubject<string>("");

  @ViewChild("tabelaList", { static: false }) tabelaList: TableListComponent;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router
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
        this.loadUsers(0, this.itemsPerPage, this.searchTerm$.getValue());
      });
  }

  ngAfterViewInit() {
    this.tabelaList.changedPage.subscribe((evt: PaginationInstance) => {
      let offset = (evt.currentPage - 1) * evt.itemsPerPage;
      if (offset > 0 && evt.itemsPerPage > 1) {
        offset = offset - 1;
      }

      this.loadUsers(offset, evt.itemsPerPage, this.searchTerm$.getValue());
    });

    this.loadUsers(this.offset, this.itemsPerPage, this.searchTerm$.getValue());
  }

  loadUsers(offset: number, limit: number, name = null) {
    this.usersService
      .search({ offset, limit, name: name, active: true })
      .subscribe(
        (response: Pagination<User>) => {
          console.log("response", response);
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
