import { Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { BookComponent } from './Layout/book/book.component';
import { BookDetailComponent } from './Layout/book-detail/book-detail.component';
import { canActivateAuth } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent, title: 'Login' },
    {
        path: 'dashboard',
        component: NavbarComponent,
        title: 'Dashboard',
        canActivate: [canActivateAuth],
        children: [
            {
                path: 'books',
                component: BookComponent,
                title: 'Book'
            },
        ]
    },
    {
        path: 'dashboard/books/:id',
        component: BookDetailComponent,
        title: 'Book Detail',
        canActivate: [canActivateAuth],
    },

];
