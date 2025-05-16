import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'categories',
    component: CategorySelectorComponent,
    canActivate: [() => !!localStorage.getItem('username')]
  },
  {
    path: 'list',
    component: ExpenseListComponent,
    canActivate: [() => !!localStorage.getItem('username')]
  },
  { path: '**', redirectTo: '' }
];