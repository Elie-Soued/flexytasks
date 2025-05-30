import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TaskComponent } from './task.component';
import { By } from '@angular/platform-browser';
import { routes } from '../../app.routes';
import { TaskService } from '../taskService/task.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const task = { id: 1, content: 'task1', userID: 1, checked: false };

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', [
      'deleteTask',
      'editTask',
      'checkTask',
    ]);

    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        {
          provide: TaskService,
          useValue: taskService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('Task Component is correctly rendered', () => {
    const task = fixture.debugElement.query(By.css('#task'));
    expect(task).toBeTruthy();
    const enableButton = fixture.debugElement.query(By.css('#enableButton'));
    const strikeThroughButton = fixture.debugElement.query(
      By.css('#strikethroughButton')
    );
    const deleteButton = fixture.debugElement.query(By.css('#deleteButton'));
    expect(enableButton).toBeTruthy();
    expect(strikeThroughButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
    enableButton.nativeElement.click();
    fixture.detectChanges();
    const updateButton = fixture.debugElement.query(By.css('#updateButton'));
    const disableButton = fixture.debugElement.query(By.css('#disableButton'));
    expect(updateButton).toBeTruthy();
    expect(disableButton).toBeTruthy();
  });

  it('Delete task is correctly executed', () => {
    const deleteButton = fixture.debugElement.query(By.css('#deleteButton'));
    const deleteFunction = spyOn(component, 'deleteTask');
    deleteButton.nativeElement.click();
    expect(deleteFunction).toHaveBeenCalled();
  });

  it('Check task is correctly executed', () => {
    const checkButton = fixture.debugElement.query(
      By.css('#strikethroughButton')
    );
    const checkFunction = spyOn(component, 'checkTask');
    checkButton.nativeElement.click();
    expect(checkFunction).toHaveBeenCalled();
  });

  it('Enable task is correctly executed', () => {
    const enableButton = fixture.debugElement.query(By.css('#enableButton'));
    const editFunction = spyOn(component, 'enableTask');
    enableButton.nativeElement.click();
    expect(editFunction).toHaveBeenCalled();
  });

  it('Update task is correctly executed in task', () => {
    const enableButton = fixture.debugElement.query(By.css('#enableButton'));
    enableButton.nativeElement.click();
    fixture.detectChanges();
    const updateButton = fixture.debugElement.query(By.css('#updateButton'));
    const updateFunction = spyOn(component, 'editTask');
    updateButton.nativeElement.click();
    expect(updateFunction).toHaveBeenCalled();
  });

  it('Disable task is correctly executed', () => {
    const enableButton = fixture.debugElement.query(By.css('#enableButton'));
    enableButton.nativeElement.click();
    fixture.detectChanges();
    const disableButton = fixture.debugElement.query(By.css('#disableButton'));
    const updateFunction = spyOn(component, 'disableTask');
    disableButton.nativeElement.click();
    expect(updateFunction).toHaveBeenCalled();
  });
});
