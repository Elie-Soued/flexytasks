import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../sharedservices/user.service';
import { TaskcontainerComponent } from '../../tasks/taskcontainer/taskcontainer.component';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, FontAwesomeModule, TaskcontainerComponent],
  templateUrl: './dashboard.component.html',
  providers: [],
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  logoutIcon = faRightFromBracket;

  constructor(private userService: UserService) {}

  logout(): void {
    this.userService.logout();
  }
}
