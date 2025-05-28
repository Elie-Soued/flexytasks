import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LandingpageComponent } from './landingpage.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app/app.routes';
import { provideStore } from '@ngrx/store';
import { tokenReducer } from '../../store/token.reducer';
import { provideEffects } from '@ngrx/effects';
import { TokenEffects } from '../../store/token.effects';
import { QueryService } from '../../sharedservices/query.service';
import { TokenService } from '../../sharedservices/token.service';
import { of } from 'rxjs';

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;
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
      imports: [FormsModule, LandingpageComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        provideStore({ token: tokenReducer }),
        provideEffects([TokenEffects]),
        { provide: QueryService, useValue: queryService },
        { provide: TokenService, useValue: tokenService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Making sure the inputs and button are correctly rendered', () => {
    const username = fixture.debugElement.query(By.css('#username'));
    const password = fixture.debugElement.query(By.css('#password'));
    const submit = fixture.debugElement.query(By.css('#submit'));
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(submit).toBeTruthy();
  });
  it('Making sure submit button is correctly enabled and disabled', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    // Selecting elements
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
    usernameInput.value = 'foo';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(submitButton.disabled).toBeTruthy();

    // Add values to passwordInput
    passwordInput.value = 'bar';
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
  it('Correct redirect after successfull login', async () => {
    const mockToken = 'ouf';
    const mockResponse = { accessToken: 'ouf' };
    tokenService.getToken.and.returnValue(mockToken);
    queryService.post.and.returnValue(of(mockResponse));

    const usernameInput = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    const submitButton = fixture.debugElement.query(
      By.css('#submit')
    ).nativeElement;

    usernameInput.value = 'foo';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'bar';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    submitButton.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
