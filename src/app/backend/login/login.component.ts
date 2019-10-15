import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/backend/core/auth.service';
import { User } from '@app/backend/core/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  error?: string = null;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/backend/php-list']);
    }
  }

  onLogin(form: NgForm) {
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .then(() => {
        this.router.navigate(['/backend/php-list']);
      })
      .catch(err => this.error = err.message);

    this.form.reset();
  }

  removeError() {
    this.error = null;
  }

}
