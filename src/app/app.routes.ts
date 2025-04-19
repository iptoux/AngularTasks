import { Routes } from '@angular/router';
import {TasksComponent} from './components/page/tasks/tasks.component';
import {InitialChoiceComponent} from './components/initial-choice/initial-choice.component';
import {CreateAccountComponent} from './components/account/create-account/create-account.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'initial-choice', component: InitialChoiceComponent},
  { path: 'account/create/:action', component: CreateAccountComponent },
  { path: '**', redirectTo: 'index.html' }
];
