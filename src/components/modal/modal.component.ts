import { Component, Output, EventEmitter } from '@angular/core';
import { QueryService } from '../../service/query.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'app-modal',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
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
