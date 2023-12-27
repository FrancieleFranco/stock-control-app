import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
  },
];
