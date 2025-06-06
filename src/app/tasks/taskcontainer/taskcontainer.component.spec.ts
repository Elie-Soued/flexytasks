import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TaskcontainerComponent } from './taskcontainer.component';
import { TaskComponent } from '../task/task.component';
import { By } from '@angular/platform-browser';
import { routes } from '../../app.routes';
import { TaskService } from '../taskService/task.service';

describe('TaskcontainerComponent', () => {
  let component: TaskcontainerComponent;
  let fixture: ComponentFixture<TaskcontainerComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const tasks = [
    { id: 1, content: 'task1', userID: 1, checked: false },
    { id: 2, content: 'task2', userID: 1, checked: false },
    { id: 3, content: 'task3', userID: 1, checked: false },
  ];

  const tasksAfterDeletion = [
    { id: 1, content: 'task1', userID: 1, checked: false },
    { id: 2, content: 'task2', userID: 1, checked: false },
  ];

  const tasksAfterUpdate = [
    { id: 1, content: 'task1', userID: 1, checked: false },
    { id: 2, content: 'taskOuf!!!', userID: 1, checked: false },
  ];

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', [
      'deleteAllTasks, addTask',
      'tasks',
      'getAllTasks',
      'updateTask',
    ]);
    await TestBed.configureTestingModule({
      imports: [TaskcontainerComponent, TaskComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        {
          provide: TaskService,
          useValue: taskService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskcontainerComponent);
    component = fixture.componentInstance;
    component.tasks = tasks;
    fixture.detectChanges();
  });

  it('TaskContainer is correctly rendered', () => {
    const newTask = fixture.debugElement.query(By.css('#newTask'));
    const appTask = fixture.debugElement.query(By.css('app-task'));
    expect(newTask).toBeTruthy();
  });

  it('Add task is correctly executed', () => {
    const newTask = fixture.debugElement.query(By.css('#newTask'));
    newTask.nativeElement.value = "S'il arrive qu'un Anglais";
    newTask.nativeElement.dispatchEvent(new Event('input'));
    const addTaskSpy = spyOn(component, 'addTask');
    const addTaskButton = fixture.debugElement.query(By.css('#addTaskButton'));
    addTaskButton.nativeElement.click();

    fixture.detectChanges();

    expect(component.newTask).toEqual("S'il arrive qu'un Anglais");
    expect(addTaskSpy).toHaveBeenCalled();
  });

  it('Pagination component is rendered correctly', () => {
    component.totalCount = 10;
    component.limit = 5;
    fixture.detectChanges();
    const paginationComponent = fixture.debugElement.query(
      By.css('app-pagination')
    );

    expect(paginationComponent).toBeTruthy();

    component.totalCount = 5;
    component.limit = 10;

    fixture.detectChanges();
    const paginationComponent2 = fixture.debugElement.query(
      By.css('app-pagination')
    );

    expect(paginationComponent2).toBeFalsy();
  });

  it('Delete all task is correctly executed', () => {
    const deleteButton = fixture.debugElement.query(By.css('#deleteAll'));
    const deleteFunction = spyOn(component, 'deleteAll');
    deleteButton.nativeElement.click();
    expect(deleteFunction).toHaveBeenCalled();
  });
});
