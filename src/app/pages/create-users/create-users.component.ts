import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { GroupService } from 'src/app/services/group.service';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  myform: FormGroup;
  groups: any;

  constructor(
    private usersService: UsersService,
    private groupService: GroupService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.groupService
      .getAll({
        active: true
      })
      .subscribe(data => {
        this.groups = data.items;
      });

    this.createForm();
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.email]),
      username2: new FormControl('', [Validators.required, , Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      group: new FormControl('', Validators.required)
    });
  }


  validaPassword() {
    if (this.password.value !== this.password2.value) {
      return;
    }
  }

  onSubmit() {
    const data = {
      name: this.name.value,
      username: this.username.value,
      username2: this.username.value,
      password: this.password.value,
      password2: this.password.value,
      group: this.group.value
    };
    if (!this.myform.valid) {
      this.toastr.error(
        'Cadastro de usuário.',
        'Campos inválidos para o registro.',
        environment.messagesConf as GlobalConfig
      );
      return;
    }
    if (this.myform.valid) {
      this.usersService.register(data).subscribe(
        resp => {
          if (resp.status === 200) {
            this.toastr.success(
              'Cadastro de usuário.',
              'Usuário cadastrado com sucesso.',
              environment.messagesConf as GlobalConfig
            );
            this.router.navigate(['/list-users']);
            return;
          }
        },
        error => {
          this.toastr.error(
            'Cadastro de usuário.',
            error.error.message,
            environment.messagesConf as GlobalConfig
          );
        }
      );
    }
  }
  get name() {
    return this.myform.get('name');
  }
  get username() {
    return this.myform.get('username');
  }
  get username2() {
    return this.myform.get('username2');
  }
  get password() {
    return this.myform.get('password');
  }
  get password2() {
    return this.myform.get('password2');
  }
  get group() {
    return this.myform.get('group');
  }
}
