import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard'
	},
	{
		path: 'dashboard',
		loadComponent: () =>
			import('./View/dashboard/dashboard').then((m) => m.Dashboard)
	},
	{
		path: 'users',
		loadComponent: () =>
			import('./View/users/users').then((m) => m.Users)
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];
