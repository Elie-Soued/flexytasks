import { Component } from '@angular/core';
import { QueryService } from '../../service/query.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { TokenService } from '../../service/token.service';
import { ModalComponent } from '../../components/modal/modal.component';

interface loginResponse {
  code: number;
  accessToken: string | undefined;
  message: string | undefined;
}

type loginPayload = {
  username: string;
  password: string;
};

@Component({
  selector: 'app-landingpage',
  imports: [FormsModule, ModalComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
  providers: [QueryService, Router],
})
export class LandingpageComponent {
  username = '';
  password = '';
  error: string | undefined = '';
  private URL_LOGIN = environment.URL_LOGIN;
  forgotPassword = false;

  constructor(
    private queryService: QueryService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  login(): void {
    this.queryService
      .post<loginResponse, loginPayload>(this.URL_LOGIN, {
        username: this.username,
        password: this.password,
      })
      .subscribe({
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

  showModal() {
    this.forgotPassword = true;
  }

  closeModal() {
    this.forgotPassword = false;
  }
}
