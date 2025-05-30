import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type task } from '../taskService/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskService } from '../taskService/task.service';

import {
  faTrash,
  faEdit,
  faCheck,
  faTimes,
  faStrikethrough,
  faBroom,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: task;
  checked = false;
  disabled = true;
  updatedTask = '';
  // Icons
  delete = faTrash;
  edit = faEdit;
  check = faCheck;
  undo = faTimes;
  broom = faBroom;
  strikethrough = faStrikethrough;

  constructor(private taskService: TaskService) {}

  deleteTask(): void {
    this.taskService.deleteTask(this.task.id);
  }

  editTask(): void {
    this.taskService.editTask(this.task.id, this.task.content);
    this.disabled = true;
  }

  checkTask(checked: boolean): void {
    this.taskService.checkTask(checked, this.task.id);
    this.disabled = true;
  }

  enableTask(): void {
    this.disabled = false;
  }

  disableTask(): void {
    this.task.content = '';
  }
}
