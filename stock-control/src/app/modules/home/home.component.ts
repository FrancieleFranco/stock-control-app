import { AuthRequest } from './../../models/interfaces/user/auth/authRequst';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  sigupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cokieService: CookieService
  ) {}

  onSubmitLoginForm(): void {
    //console.log('Dados do formulário de login', this.loginForm.value);
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cokieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  onSubmitsigupForm(): void {
    if (this.sigupForm.value && this.sigupForm.valid) {
      this.userService
        .signupUser(this.sigupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              alert('Usuário criado com sucesso');
              this.sigupForm.reset();
              this.loginCard = true;
            }
          },
          error: (err) => console.log(err),
        });
    }
    // console.log('Dados do formulário de criação', this.sigupForm.value);
  }
}
