import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {
  @Output() sendBranch = new EventEmitter();
  branchSelected: any;

  constructor() {

  }

  ngOnInit() {}

  makeChange(branch: any) {
    this.branchSelected = branch;
    this.sendBranch.emit(this.branchSelected);
  }
}
