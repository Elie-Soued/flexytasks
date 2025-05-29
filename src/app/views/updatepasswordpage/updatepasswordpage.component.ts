import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../sharedservices/token.service';
import { UserService } from '../../sharedservices/user.service';
import { type updatePasswordResponse } from '../../sharedservices/user.service';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule],
  templateUrl: './updatepasswordpage.component.html',
  styleUrl: './updatepasswordpage.component.css',
  providers: [],
})
export class UpdatepasswordpageComponent implements OnInit {
  password = '';
  confirmedpassword = '';
  error: string | undefined = '';

  constructor(
    private userService: UserService,
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

  updatePassword(): void {
    this.userService.updatePassword(this.confirmedpassword).subscribe({
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
