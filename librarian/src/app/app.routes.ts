import { Routes } from '@angular/router';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { canActivateAuth } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full', title: 'Dashboard' },
    { path: 'login', loadComponent: () => import('./Layout/login/login.component').then(mod => mod.LoginComponent), title: 'Login' },
    {
        path: 'dashboard',
        component: NavbarComponent,
        canActivate: [canActivateAuth],
        loadChildren: () => import('./core/router/dashboard-router.routes').then(mod => mod.DASHBOARD_ROUTER),
        title: 'Dashboard',
    }
];
