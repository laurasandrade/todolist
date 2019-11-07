import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Navigator } from '../../helpers/navigator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sendBranch = new EventEmitter();

  branches: any;

  branchSelected: any;
  user: User = null;
  options: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute) {
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

    this.branches = this.user.branches.map(branch => branch.id);

    this.route.paramMap.subscribe(params => {
      this.branchSelected = params.get('branch');
    });

    if (this.branches.length > 0 && this.branchSelected === null) {
      this.branchSelected = this.branches[0];
    }
    this.makeChange(this.branchSelected);
  }

  makeChange(branch: any) {
    this.branchSelected = branch;
    this.sendBranch.emit(this.branchSelected);
  }
}
