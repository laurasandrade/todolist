import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';

import { Navigator } from '../../helpers/navigator';

import { ToastrService, GlobalConfig } from 'ngx-toastr';

import { environment } from '../../../environments/environment'
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class LoginPage implements OnInit {
  hide = true;
  message = '';
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('',
        [Validators.required, Validators.email]
      ),
      'password': new FormControl('', [
        Validators.required
      ])
    });

  }

  ngOnInit() {
    this.authService.clear();
  }

  authenticate() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.authenticate(this.email.value, this.password.value).subscribe(
      () => {
        Navigator.navigateToSearchPolls();
      },
      (response: HttpErrorResponse) => {
        if (response.status === 400) {
          this.toastr.error('Login', 'E-mail ou senha inválidos.', environment.messagesConf as GlobalConfig);
          return;
        }
        if (response.status === 500) {
          this.toastr.error('Login', 'Ocorreu um erro. Tente novamente mais tarde.', environment.messagesConf as GlobalConfig);
          return;
        }
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}