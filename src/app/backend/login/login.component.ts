import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/backend/core/auth.service';
import { User } from '@app/backend/core/user.interface';
import { Logger } from '@app/core';

const log = new Logger('LoginComponent');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: false }) public form: NgForm;
  public error?: string = null;
  public user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router
        .navigate(['/php-list'])
        .then(() => log.info('User is already logged in - redirect to `php-list`'));
    }
  }

  public onLogin(form): void {
    this.error = null;
    this.authService
      .login(form.value.email, form.value.password)
      .then(response => {
        if (response) {
          this.router
            .navigate(['/php-list'])
            .then(() => {
              log.info('Login with success');
            });
        }
      })
      .catch(error => {
        this.error = error;
        log.error(error);
        if (error.code === 'auth/wrong-password') {
          form.controls.password.setErrors({ incorrect: true });
        }
        if (error.code === 'auth/user-not-found') {
          form.controls.password.setErrors({ incorrect: true });
          form.controls.email.setErrors({ incorrect: true });
        }
      });
  }
}
