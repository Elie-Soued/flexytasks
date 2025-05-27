import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-forgot-password-modal',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './forgotpasswordmodal.component.html',
  styleUrl: './forgotpasswordmodal.component.css',
})
export class ForgotPasswordModalComponent {
  @Output() closeDialog = new EventEmitter();
  username = '';
  email = '';
  error: string | undefined;
  success: string | undefined;
  closeModalIcon = faTimes;

  constructor(private userService: UserService) {}

  closeModal() {
    this.closeDialog.emit();
  }

  resetPassword() {
    this.userService.resetPassword(this.username, this.email).subscribe({
      next: (response: any) => {
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
