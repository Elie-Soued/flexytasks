import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterpageComponent } from './registerpage.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app/app.routes';
import { QueryService } from '../../service/query.service';
import { of } from 'rxjs';

describe('RegisterpageComponent', () => {
  let component: RegisterpageComponent;
  let fixture: ComponentFixture<RegisterpageComponent>;
  let queryService: jasmine.SpyObj<QueryService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    queryService = jasmine.createSpyObj('QueryService', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterpageComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        { provide: QueryService, useValue: queryService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Making sure the inputs and button are correctly rendered', () => {
    const username = fixture.debugElement.query(By.css('#username'));
    const password = fixture.debugElement.query(By.css('#password'));
    const fullname = fixture.debugElement.query(By.css('#fullname'));
    const email = fixture.debugElement.query(By.css('#email'));
    const submit = fixture.debugElement.query(By.css('#submit'));
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(fullname).toBeTruthy();
    expect(email).toBeTruthy();
    expect(submit).toBeTruthy();
  });

  it('Making sure submit button is correctly enabled and disabled', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    // Selecting elements
    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    const fullnameInput = fixture.debugElement.query(
      By.css('#fullname')
    ).nativeElement;
    const usernameInput = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    const submitButton = fixture.debugElement.query(
      By.css('#submit')
    ).nativeElement;

    // Ensure button is disabled initially
    expect(submitButton.disabled).toBeTruthy();

    // Add values to usernameInput
    usernameInput.value = 'fooUserName';
    usernameInput.dispatchEvent(new Event('input'));

    fullnameInput.value = 'fooFullName';
    fullnameInput.dispatchEvent(new Event('input'));

    emailInput.value = 'foo@gmail.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    expect(submitButton.disabled).toBeTruthy();

    // Add values to passwordInput
    passwordInput.value = 'fooPassword';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(submitButton.disabled).toBeFalsy();
  });

  it('Display error message in case the backend returns an error', async () => {
    // Error is not showing
    fixture.detectChanges();
    await fixture.whenStable();
    const errorMessage = fixture.debugElement.query(
      By.css('#errorMessage')
    ).nativeElement;
    expect(errorMessage.hidden).toBeTruthy();

    // Error is showing
    component.error = 'user does not exist';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(errorMessage.hidden).toBeFalsy();
  });
  it('If email has not the correct format, submit button should remain disabled', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    // Selecting elements
    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    const fullnameInput = fixture.debugElement.query(
      By.css('#fullname')
    ).nativeElement;
    const usernameInput = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    const submitButton = fixture.debugElement.query(
      By.css('#submit')
    ).nativeElement;

    // Ensure button is disabled initially
    expect(submitButton.disabled).toBeTruthy();

    // Add values to usernameInput
    usernameInput.value = 'fooUserName';
    usernameInput.dispatchEvent(new Event('input'));

    fullnameInput.value = 'fooFullName';
    fullnameInput.dispatchEvent(new Event('input'));

    emailInput.value = 'foo';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'fooPassword';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    expect(submitButton.disabled).toBeTruthy();

    // correct the email
    emailInput.value = 'foo@gmail.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    expect(submitButton.disabled).toBeFalsy();
  });

  it('If all correct data are entered and user does not exist previously, user should be redirected to the login page', async () => {
    const mockResponse = { message: 'User registered successfully' };

    queryService.post.and.returnValue(of(mockResponse));

    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    const fullnameInput = fixture.debugElement.query(
      By.css('#fullname')
    ).nativeElement;
    const usernameInput = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    const submitButton = fixture.debugElement.query(
      By.css('#submit')
    ).nativeElement;

    usernameInput.value = 'fooUserName';
    usernameInput.dispatchEvent(new Event('input'));
    fullnameInput.value = 'fooFullName';
    fullnameInput.dispatchEvent(new Event('input'));
    emailInput.value = 'foo@gmail.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'fooPassword';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    submitButton.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
