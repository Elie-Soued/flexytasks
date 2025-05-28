import { Routes } from '@angular/router';
import { ResetpasswordpageComponent } from './views/resetpasswordpage/resetpasswordpage.component';
import { RegisterpageComponent } from './views/registerpage/registerpage.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LandingpageComponent } from './views/landingpage/landingpage.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resetpassword', component: ResetpasswordpageComponent },
];
