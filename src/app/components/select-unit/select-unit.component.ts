import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Navigator } from '../../helpers/navigator';
import { BranchService } from 'src/app/services/branch.service';
import { startWith, map, debounceTime, takeLast } from 'rxjs/operators';
import { Pagination } from 'src/app/models/pagination';
import { Branch } from 'src/app/models/branch';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';


@Component({
  selector: 'app-select-unit',
  templateUrl: './select-unit.component.html',
  styleUrls: ['./select-unit.component.scss']
})
export class SelectUnitComponent implements OnInit {
  @Output() sendBranch = new EventEmitter();
  branches: Observable<Array<Branch>>;
  branchSelected: any;
  user: User = null;
  options: FormGroup;
  branchControl: FormControl = new FormControl();

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private branchService: BranchService,
    private route: ActivatedRoute
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
    this.user = this.authService.user;
  }

  ngOnInit() {
    if (!this.user.hasPermission('polls:read')) {
      Navigator.navigateToLogin();
    }

    if (!this.user.isAdmin) {
      const lst = of(this.user.branches);
      this.branches = lst.map(value => value);

      lst.subscribe(lst => {
        if (lst.length > 0 && this.branchSelected === null) {
          this.branchSelected = lst[0];
          this.makeChange(this.branchSelected);
        }
      });
    } else {
      this.branchControl.valueChanges
      .distinctUntilChanged()
      .pipe(debounceTime(500))
      .subscribe(value => this.searchBranch(value));
    }

    this.route.paramMap.subscribe(params => {
      this.branchSelected = params.get('branch');
    });

    this.makeChange(this.branchSelected);
  }

  makeChange(branch: any) {
    this.branchSelected = branch;
    this.sendBranch.emit(this.branchSelected);
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.makeChange(this.branchControl.value);
  }

  searchBranch(value: string) {
    const params = {
      offset: 0,
      limit: 10,
      name: value
    };
    this.branches =  this.branchService.search(params).map(
      (response: Pagination<Branch>) => {
        return response.items;
      }
    );
  }
}
