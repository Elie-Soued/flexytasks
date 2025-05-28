import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../sharedservices/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './registerpage.component.html',
  providers: [],
  styleUrl: './registerpage.component.css',
})
export class RegisterpageComponent {
  username = '';
  password = '';
  email = '';
  fullname = '';
  error = '';
  arrow = faArrowLeft;

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService
      .register(this.username, this.password, this.email, this.fullname)
      .subscribe({
        next: () => {
          this.error = '';
          this.router.navigate(['']);
        },
        error: (e) => {
          this.error = e.error?.message;
        },
      });
  }
}
