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
		path: '**',
		redirectTo: 'dashboard'
	}
];
