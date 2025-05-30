import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UpdatepasswordpageComponent } from './updatepasswordpage.component';
import { UserService } from '../../sharedservices/user.service';
import { TokenService } from '../../sharedservices/token.service';

describe('UpdatepasswordpageComponent', () => {
  let component: UpdatepasswordpageComponent;
  let fixture: ComponentFixture<UpdatepasswordpageComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    tokenService = jasmine.createSpyObj('TokenService', [
      'getToken',
      'setToken',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    userService = jasmine.createSpyObj('UserService', ['updatePassword']);

    await TestBed.configureTestingModule({
      imports: [UpdatepasswordpageComponent],
      providers: [
        { provide: TokenService, useValue: tokenService },
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatepasswordpageComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('updatepasswordPage view is correctly rendered', () => {
    const updatePasswordBtn = fixture.debugElement.query(
      By.css('#submit')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#passwordInput')
    ).nativeElement;
    const confirmedpasswordInput = fixture.debugElement.query(
      By.css('#confirmedpasswordInput')
    ).nativeElement;

    expect(updatePasswordBtn).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmedpasswordInput).toBeTruthy();
  });

  it('Submit button is disabled and enabled correctly', async () => {
    const updatePasswordBtn = fixture.debugElement.query(
      By.css('#submit')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#passwordInput')
    ).nativeElement;
    const confirmedpasswordInput = fixture.debugElement.query(
      By.css('#confirmedpasswordInput')
    ).nativeElement;

    // Submit button is initially disabled.
    expect(updatePasswordBtn.disabled).toBeTruthy();

    passwordInput.value = 'pilex';
    passwordInput.dispatchEvent(new Event('input'));
    confirmedpasswordInput.value = 'pilex';
    confirmedpasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    // if the same value for password and confirmed password is entered, the submit button should be enabled
    expect(updatePasswordBtn.disabled).toBeFalsy();

    passwordInput.value = 'pile';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    // if the value of confirmedpassword and password is not the same, the submit button should be disabled
    expect(updatePasswordBtn.disabled).toBeTruthy();

    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    confirmedpasswordInput.value = '';
    confirmedpasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    // If password and confirmedpassword are cleared, then the submit button should be disabled
    expect(updatePasswordBtn.disabled).toBeTruthy();
  });

  it('updatePassword function is correctly executed', async () => {
    const updatePasswordMock = spyOn(component, 'updatePassword');
    const updatePasswordBtn = fixture.debugElement.query(
      By.css('#submit')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#passwordInput')
    ).nativeElement;
    const confirmedpasswordInput = fixture.debugElement.query(
      By.css('#confirmedpasswordInput')
    ).nativeElement;

    passwordInput.value = 'pilex';
    passwordInput.dispatchEvent(new Event('input'));
    confirmedpasswordInput.value = 'pilex';
    confirmedpasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    updatePasswordBtn.click();

    expect(updatePasswordMock).toHaveBeenCalled();
  });

  it('redirection to landing page when call is successfully executed', async () => {
    const mockResponse = { code: 200, success: 'password has been updated' };

    userService.updatePassword.and.returnValue(of(mockResponse));

    const updatePasswordBtn = fixture.debugElement.query(
      By.css('#submit')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#passwordInput')
    ).nativeElement;
    const confirmedpasswordInput = fixture.debugElement.query(
      By.css('#confirmedpasswordInput')
    ).nativeElement;

    passwordInput.value = 'pilex';
    passwordInput.dispatchEvent(new Event('input'));
    confirmedpasswordInput.value = 'pilex';
    confirmedpasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    updatePasswordBtn.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('error message is displayed when error is received from the backend', async () => {
    const errorMessage = fixture.debugElement.query(
      By.css('#errorMessage')
    ).nativeElement;

    component.error = 'some error';
    fixture.detectChanges();
    expect(errorMessage['hidden']).toBeFalsy();

    component.error = '';
    fixture.detectChanges();
    expect(errorMessage['hidden']).toBeTruthy();
  });
});
