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
			import('./views/dashboard/dashboard').then((m) => m.Dashboard)
	},
	{
		path: 'users',
		loadComponent: () =>
			import('./views/users/users').then((m) => m.Users)
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];
