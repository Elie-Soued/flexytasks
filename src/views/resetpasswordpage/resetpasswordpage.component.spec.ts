import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetpasswordpageComponent } from './resetpasswordpage.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { tokenReducer } from '../../store/token.reducer';

describe('ResetpasswordpageComponent', () => {
  let component: ResetpasswordpageComponent;
  let fixture: ComponentFixture<ResetpasswordpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpasswordpageComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        provideStore({ token: tokenReducer }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetpasswordpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
