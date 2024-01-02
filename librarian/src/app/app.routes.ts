import { Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { BookComponent } from './Layout/book/book.component';
import { BookDetailComponent } from './Layout/book-detail/book-detail.component';
import { BookAddComponent } from './Layout/book-add/book-add.component';
import { canActivateAuth } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full', title:'Login' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    {
        path: 'dashboard',
        component: NavbarComponent,
        title: 'Dashboard',
        canActivate: [canActivateAuth],
        children: [
            {
                path: 'books',
                component: BookComponent,
                title: 'Book Manager'
            },
            {
                path: 'addBook',
                component: BookAddComponent,
                title: 'Add Book',
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
