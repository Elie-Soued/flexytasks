import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetpasswordpageComponent } from './resetpasswordpage.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { tokenReducer } from '../../store/token.reducer';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QueryService } from '../../service/query.service';
import { TokenService } from '../../service/token.service';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

describe('ResetpasswordpageComponent', () => {
  let component: ResetpasswordpageComponent;
  let fixture: ComponentFixture<ResetpasswordpageComponent>;
  let queryService: jasmine.SpyObj<QueryService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let tokenService: jasmine.SpyObj<TokenService>;

  beforeEach(async () => {
    queryService = jasmine.createSpyObj('QueryService', ['post']);
    tokenService = jasmine.createSpyObj('TokenService', [
      'getToken',
      'setToken',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ResetpasswordpageComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        provideStore({ token: tokenReducer }),
        { provide: QueryService, useValue: queryService },
        { provide: TokenService, useValue: tokenService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetpasswordpageComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('resetpassword view is correctly rendered', () => {
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
    const mockToken = 'myAccessToken';
    tokenService.getToken.and.returnValue(mockToken);
    queryService.post.and.callThrough();

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

    expect(queryService.post).toHaveBeenCalledWith(`users/updatepassword`, {
      updatedpassword: 'pilex',
    });
  });

  it('redirection to landing page when call is successfully executed', async () => {
    const mockToken = 'myAccessToken';
    const mockResponse = { code: 200, success: 'password has been updated' };
    tokenService.getToken.and.returnValue(mockToken);
    queryService.post.and.returnValue(of(mockResponse));

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
