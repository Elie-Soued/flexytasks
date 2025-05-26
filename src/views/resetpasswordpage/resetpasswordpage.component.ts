import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../service/query.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../service/token.service';

type updatePasswordPayload = {
  updatedpassword: string;
};

type updatePasswordResponse = {
  code: number;
  success: string;
  message: string | undefined;
};

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule],
  templateUrl: './resetpasswordpage.component.html',
  styleUrl: './resetpasswordpage.component.css',
  providers: [],
})
export class ResetpasswordpageComponent implements OnInit {
  token: string = '';
  password = '';
  confirmedpassword = '';
  error: string | undefined = '';

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
        'users/updatepassword',

        {
          updatedpassword: this.confirmedpassword,
        }
      )
      .subscribe({
        next: (response: updatePasswordResponse) => {
          const { code, message } = response;

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
