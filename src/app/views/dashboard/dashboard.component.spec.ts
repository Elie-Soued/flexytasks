import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from '../../app.routes';
import { tokenReducer } from '../../../store/token.reducer';
import { TokenEffects } from '../../../store/token.effects';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        provideHttpClientTesting(),
        provideStore({ token: tokenReducer }),
        provideEffects([TokenEffects]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('DashboardView is correctly rendered', () => {
    const logout = fixture.debugElement.query(By.css('#logout'));
    const taskContainer = fixture.debugElement.query(By.css('#taskContainer'));
    expect(logout).toBeTruthy();
    expect(taskContainer).toBeTruthy();
  });

  it('Logout function is correctly executed', () => {
    localStorage.setItem('accessToken', 'pilex');

    const logoutFunction = spyOn(component, 'logout').and.callThrough();
    const logoutButton = fixture.debugElement.query(
      By.css('#logout')
    ).nativeElement;

    logoutButton.click();

    expect(logoutFunction).toHaveBeenCalled();
    expect(localStorage.getItem('accessToken')).toEqual('');
  });
});
