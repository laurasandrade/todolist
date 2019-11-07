import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

import { Navigator } from '../../helpers/navigator';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { Device } from 'src/app/models/device';
import { Pagination } from 'src/app/models/pagination';
import { DispositivosService } from 'src/app/services/dispositivos.service';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject } from 'rxjs';
import { TableListColumn } from 'src/app/components/table-list/model/table-list-column';


@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.scss']
})

// tslint:disable-next-line:component-class-suffix
export class DispositivosPage implements OnInit, AfterViewInit {
  user: User = null;
  offset = 0;
  itemsPerPage = environment.pagination.itemsPerPage;
  columns: TableListColumn[] = [{ type: 'text', value: 'alias', description: '', URL: '', format: '' },
  { type: 'date', value: 'lastSync', description: '', URL: '', format: 'dd/MM/yyyy HH:mm' },
  { type: 'text', value: 'email', description: '', URL: '', format: '' },
  { type: 'text', value: 'advertising', description: '', URL: '', format: '' },
  { type: 'text', value: 'serial', description: '', URL: '', format: '' },
  { type: 'text', value: 'version', description: '', URL: '', format: '' },
  { type: 'text', value: 'model', description: '', URL: '', format: '' },
  { type: 'text', value: 'manufacturer', description: '', URL: '', format: '' }];

  columnsName: string[] = ['Unidade', 'Última Atualização', 'E-mail', 'Tipo do Banner', 'Serial', 'Versão', 'Modelo', 'Marca'];
  messageConf: Partial<GlobalConfig> = environment.messagesConf as GlobalConfig;
  message = '';
  titlePage = 'Todos os dispositivos';
  searchTerm$ = new BehaviorSubject<string>('');

  @ViewChild('tabelaList', { static: false }) tabelaList: TableListComponent;

  constructor(
    private authService: AuthService,
    private deviceService: DispositivosService,
    private toastr: ToastrService) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    if (!this.user.hasPermission('devices:read')) {
      Navigator.navigateToLogin();
    }
    this.searchTerm$.debounceTime(400)
      .distinctUntilChanged()
      .subscribe(s => {
        this.loadDevices(0, this.itemsPerPage, this.searchTerm$.getValue());
      });
  }

  ngAfterViewInit(): void {
    this.tabelaList.changedPage.subscribe((evt: PaginationInstance) => {
      let offset = (evt.currentPage - 1) * evt.itemsPerPage;
      if (offset > 0 && evt.itemsPerPage > 1) {
        offset = offset - 1;
      }

      this.loadDevices(offset, evt.itemsPerPage, this.searchTerm$.getValue());
    });
    this.loadDevices(0, this.itemsPerPage, this.searchTerm$.getValue());
  }


  loadDevices(offset: number, limit: number, name = null) {
    this.deviceService.search(offset, limit, name)
      .subscribe(
        (response: Pagination<Device>) => {
          this.tabelaList.receiveServer(response.items, response.offset, response.limit, response.total);
        },
        (response: HttpErrorResponse) => {
          this.message = 'Não foi possível realizar a pesquisa.';
          this.toastr.error(this.titlePage, this.message, this.messageConf);
        }
      );
  }
}
