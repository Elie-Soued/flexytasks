import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../sharedservices/token.service';
import { ForgotPasswordModalComponent } from './forgotpasswordmodal/forgotpasswordmodal.component';
import { UserService } from '../../sharedservices/user.service';
import { type loginResponse } from '../../sharedservices/user.service';

@Component({
  selector: 'app-landingpage',
  imports: [FormsModule, ForgotPasswordModalComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
  providers: [],
})
export class LandingpageComponent {
  username = '';
  password = '';
  error: string | undefined = '';
  forgotPassword = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  login(): void {
    this.userService.login(this.username, this.password).subscribe({
      next: (response: loginResponse) => {
        const { accessToken, message } = response;
        if (accessToken) {
          this.router.navigate(['/dashboard']);
          this.tokenService.setToken(accessToken);
        } else {
          this.error = message;
        }
      },
      error: (e: any) => {
        this.error = e.error.message;
      },
    });
  }

  showModal(): void {
    this.forgotPassword = true;
  }
}
