import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../sharedservices/user.service';
import { type forgotPasswordResponse } from '../../../sharedservices/user.service';

@Component({
  selector: 'app-forgot-password-modal',
  imports: [FormsModule],
  templateUrl: './forgotpasswordmodal.component.html',
  styleUrl: './forgotpasswordmodal.component.css',
})
export class ForgotPasswordModalComponent {
  username = '';
  email = '';
  error: string | undefined;
  success: string | undefined;

  constructor(private userService: UserService) {}

  resetPassword() {
    this.userService.resetPassword(this.username, this.email).subscribe({
      next: (response: forgotPasswordResponse) => {
        if (response.code === 200) {
          this.success = response.success;
        } else {
          this.error = response.message;
        }
      },
      error: (e: any) => {
        this.error = e.error.message;
      },
    });
  }
}
