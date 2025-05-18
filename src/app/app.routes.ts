import { Routes } from '@angular/router';
import { LandingpageComponent } from '../views/landingpage/landingpage.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { RegisterpageComponent } from '../views/registerpage/registerpage.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: 'dashboard', component: DashboardComponent },
];
