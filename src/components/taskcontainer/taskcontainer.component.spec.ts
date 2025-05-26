import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TaskcontainerComponent } from './taskcontainer.component';
import { TaskComponent } from '../task/task.component';
import { routes } from '../../app/app.routes';
import { By } from '@angular/platform-browser';
import { QueryService } from '../../service/query.service';

describe('TaskcontainerComponent', () => {
  let component: TaskcontainerComponent;
  let queryService: jasmine.SpyObj<QueryService>;
  let fixture: ComponentFixture<TaskcontainerComponent>;

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
    queryService = jasmine.createSpyObj('QueryService', ['post', 'delete']);

    await TestBed.configureTestingModule({
      imports: [TaskcontainerComponent, TaskComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        { provide: QueryService, useValue: queryService },
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
    expect(appTask).toBeTruthy();
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

  it('update task is correctly executed in taskContainer', () => {
    const updateTask = spyOn(component, 'updateTask');
    const TaskComponenInstance = fixture.debugElement.query(
      By.directive(TaskComponent)
    );
    TaskComponenInstance.componentInstance.removeTask.emit(tasksAfterDeletion);
    expect(updateTask).toHaveBeenCalled();
    TaskComponenInstance.componentInstance.editTask.emit(tasksAfterUpdate);
    expect(updateTask).toHaveBeenCalled();
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
