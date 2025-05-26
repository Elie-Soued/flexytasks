import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { QueryService } from '../../../service/query.service';

type forgotPasswordPayload = {
  username: string;
  email: string;
};

type forgotPasswordResponse = {
  code: number;
  success: string;
  message: string | undefined;
};

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

  constructor(private queryService: QueryService) {}

  closeModal() {
    this.closeDialog.emit();
  }

  resetPassword() {
    this.queryService
      .post<forgotPasswordResponse, forgotPasswordPayload>(
        'users/forgotpassword',
        {
          username: this.username,
          email: this.email,
        }
      )
      .subscribe({
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
