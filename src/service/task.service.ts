import { Injectable, signal } from '@angular/core';

import { type task } from '../type';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<task[]>([]);

  constructor() {}

  updateTasks(newTasks: task[]) {
    this.tasks.set(newTasks);
  }
}
