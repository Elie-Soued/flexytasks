import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordModalComponent } from './forgotpasswordmodal.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { QueryService } from '../../../sharedservices/query.service';

describe('ForgotPasswordModalComponent', () => {
  let component: ForgotPasswordModalComponent;
  let fixture: ComponentFixture<ForgotPasswordModalComponent>;
  let httpTesting: HttpTestingController;
  let queryService: jasmine.SpyObj<QueryService>;

  beforeEach(async () => {
    queryService = jasmine.createSpyObj('QueryService', ['post']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ForgotPasswordModalComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: QueryService, useValue: queryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordModalComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('modal should be correctly rendered', () => {
    const resetPasswordForm = fixture.debugElement.query(
      By.css('#resetPasswordForm')
    ).nativeElement;
    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    const usernameInput = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;

    const closeModalBtn = fixture.debugElement.query(
      By.css('#closeModal')
    ).nativeElement;

    expect(resetPasswordForm).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(closeModalBtn).toBeTruthy();
  });

  it('Submit button is disabled and enabled correctly', async () => {
    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    const usernameInput = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;

    const submit = fixture.debugElement.query(By.css('#submit')).nativeElement;

    // Submit button initially disabled
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(submit.disabled).toBeTruthy();

    // Submit button enabled after entering data
    emailInput.value = 'pilex@gmail.com';
    emailInput.dispatchEvent(new Event('input'));
    usernameInput.value = 'pilex';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(submit.disabled).toBeFalsy();
  });

  it('close modal', async () => {
    const closeModalSpy = spyOn(component, 'closeModal');
    const closeModalBtn = fixture.debugElement.query(
      By.css('#closeModal')
    ).nativeElement;

    closeModalBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('forgotpassword is executed correctly', async () => {
    const mockResponse = {
      code: 200,
      success:
        'Please check your inbox (and maybe also your spam). We sent you a link to reset your password :)',
    };
    queryService.post.and.returnValue(of(mockResponse));

    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    const usernameInput = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;

    const submit = fixture.debugElement.query(By.css('#submit')).nativeElement;

    const success = fixture.debugElement.query(
      By.css('#success')
    ).nativeElement;

    const error = fixture.debugElement.query(
      By.css('#errorMessage')
    ).nativeElement;

    emailInput.value = 'pilex@gmail.com';
    emailInput.dispatchEvent(new Event('input'));
    usernameInput.value = 'pilex';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    submit.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(success).toBeTruthy();
    expect(error['hidden']).toBeTruthy();
  });

  it('forgotpassword is not executed correctly and returns an error', async () => {
    const mockResponse = {
      code: 404,
      message: 'The email account is wrong',
    };
    queryService.post.and.returnValue(of(mockResponse));

    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    const usernameInput = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;

    const submit = fixture.debugElement.query(By.css('#submit')).nativeElement;
    const success = fixture.debugElement.query(
      By.css('#success')
    ).nativeElement;

    const error = fixture.debugElement.query(
      By.css('#errorMessage')
    ).nativeElement;

    emailInput.value = 'pilex@gmail.com';
    emailInput.dispatchEvent(new Event('input'));
    usernameInput.value = 'pilex';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    submit.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(error).toBeTruthy();
    expect(success['hidden']).toBeTruthy();
  });
});
