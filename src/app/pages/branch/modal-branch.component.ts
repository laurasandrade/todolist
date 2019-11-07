import {
  Component,
  OnInit,
  Inject,
  Input,
  EventEmitter,
  Output
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { User } from "src/app/models/user";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Navigator } from "../../helpers/navigator";
import { Customer } from "src/app/models/customer";
import { CustomersService } from "src/app/services/customers.service";
import { BranchService } from "src/app/services/branch.service";
import { PollService } from "src/app/services/poll.service";
import { MatProgressButtonOptions } from "mat-progress-buttons";

@Component({
  template: `
    <form [formGroup]="myform" (ngSubmit)="onSubmit()">
      <h1 mat-dialog-title class="text-center">Cadastro de unidade:</h1>
      <mat-dialog-content>
        <div>
          <mat-form-field appearance="outline">
            <mat-label>Selecionar cliente</mat-label>
            <mat-select
              (selectionChange)="makeChange($event.value)"
              [formControl]="customer"
            >
              <mat-option
                *ngFor="let customer of customers"
                [value]="customer.id"
              >
                {{ customer.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div>
          <mat-form-field appearance="outline">
            <input matInput placeholder="Unidade" [formControl]="name" />
          </mat-form-field>
        </div>
        <div>
          <mat-form-field appearance="outline">
            <input matInput placeholder="Descrição" [formControl]="descricao" />
          </mat-form-field>
        </div>
        <div>
          <mat-form-field appearance="outline">
            <mat-label>Selecionar Pesquisa</mat-label>
            <mat-select
              (selectionChange)="makeChange($event.value)"
              [formControl]="poll"
            >
              <mat-option *ngFor="let poll of polls" [value]="poll.id">{{
                poll.name
              }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-dialog-content>
      <div class="col-12 mt-2">
        <mat-dialog-actions>
          <div class="row btn_modal">
            <div>
              <button mat-button type="button" (click)="dialogRef.close()">
                Cancelar
              </button>
            </div>
            <mat-bar-button
              [options]="barButtonOptions"
              (ngSubmit)="onSubmit()"
              class="redbtn"
            >
            </mat-bar-button>
          </div>
        </mat-dialog-actions>
      </div>
    </form>
  `,
  styles: [
    `
      :host
        ::ng-deep
        mat-dialog-content
        > div:nth-child(1)
        > mat-form-field
        > div {
        padding-bottom: 0;
      }
      .mat-select-content {
        background-color: red;
        font-size: 10px;
      }
      h1 {
        font-size: 16px;
      }
      span {
        font-size: 12px;
      }
      span a {
        color: #000;
        font-size: 14px;
      }
      .btn_modal {
        display: flex;
        justify-content: space-between;
      }
      .btn_modal div {
        background-color: #941519;
        border: 0;
        color: #fff;
      }
      :host ::ng-deep .mat-form-field-wrapper {
        padding-bottom: 0;
      }

      :host ::ng-deep .mat-raised-button.mat-accent {
        background-color: #941519 !important;
        color: #fff !important;
        border-radius: 0 !important;
      }
    `
  ]
})
export class ModalBranchComponent implements OnInit {
  myform: FormGroup;

  @Input() ctrl: FormControl;
  @Input() placeholder: string;
  @Output() sendBranch = new EventEmitter();
  branches: any;
  polls: any;
  branchSelected: any;
  user: User = null;
  options: FormGroup;
  customers: Customer[];
  httpClient: any;
  submitted = false;

  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Cadastrar",
    buttonColor: "accent",
    barColor: "primary",
    raised: true,
    stroked: false,
    mode: "indeterminate",
    value: 0,
    disabled: false,
    fullWidth: false
  };

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalBranchComponent>,
    private customerService: CustomersService,
    private branchService: BranchService,
    private pollService: PollService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.createForm();

    if (!this.user.hasPermission("polls:read")) {
      Navigator.navigateToLogin();
    }

    this.pollService.findAll(0, 50).subscribe(resp => {
      this.polls = resp.items;
    });
    this.branches = this.user.branches.map(branch => branch.id);

    this.route.paramMap.subscribe(params => {
      this.branchSelected = params.get("branch");
    });

    if (this.branches.length > 0 && this.branchSelected === null) {
      this.branchSelected = this.branches[0];
    }
    this.makeChange(this.branchSelected);

    this.customerService.getAll().subscribe(data => {
      this.customers = data.items;
    });
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormControl("", Validators.required),
      descricao: new FormControl("", Validators.required),
      customer: new FormControl("", Validators.required),
      poll: new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    const data = {
      _id: this.name.value,
      _name: [this.name.value, this.descricao.value].join(" - "),
      customer: this.customer.value,
      poll: this.poll.value
    };
    if (this.myform.valid) {
      this.barButtonOptions.active = true;
      this.barButtonOptions.text = "Salvando...";
      setTimeout(() => {
        this.barButtonOptions.active = false;
        this.barButtonOptions.text = "Salvo";
      }, 3500);

      this.branchService.register(data).subscribe(
        resp => {
          console.log(resp);
        },
        resp => {
          if (resp.status === 201) {
            this.dialogRef.close();
            console.log("sucesso");
          }
        }
      );
    }
  }

  makeChange(branch: any) {
    this.branchSelected = branch;
    this.sendBranch.emit(this.branchSelected);
  }

  get name() {
    return this.myform.get("name");
  }
  get descricao() {
    return this.myform.get("descricao");
  }
  get poll() {
    return this.myform.get("poll");
  }
  get customer() {
    return this.myform.get("customer");
  }
}
