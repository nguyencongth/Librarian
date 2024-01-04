import { Routes } from '@angular/router';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { canActivateAuth } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full', title: 'Login' },
    { path: 'login', loadComponent: () => import('./Layout/login/login.component').then(mod => mod.LoginComponent), title: 'Login' },
    {
        path: 'dashboard',
        component: NavbarComponent,
        title: 'Dashboard',
        canActivate: [canActivateAuth],
        loadChildren: () => import('./core/router/dashboard-router.routes').then(mod => mod.DASHBOARD_ROUTER)
    }
];
