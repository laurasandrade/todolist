import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { TableListColumn } from './model/table-list-column';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  providers: [DatePipe]
})
export class TableListComponent implements OnInit {
  @Input() rows: object[] = [];
  @Input() columns: Array<TableListColumn> = new Array<TableListColumn>();
  @Input() itemsPerPage = environment.pagination.itemsPerPage;
  @Input() columnsName: string[] = [];
  @Output() changedPage = new EventEmitter<any>();
  loadingData = false;
  isMobile = false;
  // criar propriedades para setar os offset/perpage
  // fazer a logica de calculo do offset aqui nessa classe.

  public config: PaginationInstance;

  constructor() {}

  ngOnInit() {
    this.config = {
      id: 'paginatorTableList',
      itemsPerPage: this.itemsPerPage,
      currentPage: 0,
      totalItems: 0
    };
  }

  getColumnsName() {
    return new Array<string>().concat(
      this.columns.map(c => (c.type === 'text' ? c.value : 'LINK' + c.value))
    );
  }

  receiveServer(rows: object[], offset: number, limit: number, total: number) {
    this.loadingData = false;
    this.rows = rows;
    if (total === 0) {
      this.config = {
        id: 'paginatorTableList',
        itemsPerPage: this.config.itemsPerPage,
        currentPage: this.itemsPerPage,
        totalItems: total
      };
    } else {
      this.config = {
        id: 'paginatorTableList',
        itemsPerPage: limit,
        currentPage: Math.trunc((offset + 1) / limit) + 1,
        totalItems: total
      };
    }
  }

  onChangePage(event) {
    this.loadingData = true;
    this.config.currentPage = event;
    this.changedPage.emit(this.config);
  }
}
