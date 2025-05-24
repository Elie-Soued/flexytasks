import { Component } from '@angular/core';
import { QueryService } from '../../service/query.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import {
  type updatePasswordPayload,
  type updatePasswordResponse,
} from '../../types/type';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule],
  templateUrl: './resetpasswordpage.component.html',
  styleUrl: './resetpasswordpage.component.css',
  providers: [QueryService, Router],
})
export class ResetpasswordpageComponent {
  token: string = '';
  password = '';
  confirmedpassword = '';
  error: string | undefined = '';
  private URL_UPDATE_PASSWORD = environment.URL_UPDATE_PASSWORD;

  constructor(
    private queryService: QueryService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    if (params.get('token')) {
      this.tokenService.setToken(params.get('token')!);
      window.history.replaceState({}, document.title, '/resetpassword');
    }
  }

  updatePassword() {
    this.queryService
      .post<updatePasswordResponse, updatePasswordPayload>(
        this.URL_UPDATE_PASSWORD,

        {
          updatedpassword: this.confirmedpassword,
        },
        {
          authorization: this.tokenService.getToken(),
        }
      )
      .subscribe({
        next: (response: updatePasswordResponse) => {
          const { code, message } = response;
          console.log('response :>> ', response);
          if (code === 200) {
            this.router.navigate(['/']);
          } else {
            this.error = message;
          }
        },
        error: (e: any) => {
          this.error = e.error.message;
        },
      });
  }
}
