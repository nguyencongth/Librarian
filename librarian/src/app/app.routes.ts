import { Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { BookComponent } from './Layout/book/book.component';
import { BookDetailComponent } from './Layout/book-detail/book-detail.component';
import { BookAddComponent } from './Layout/book-add/book-add.component';
import { canActivateAuth } from './core/guards/auth.guard';
import { CategoryComponent } from './Layout/category/category.component';
import { CategoryAddComponent } from './Layout/category-add/category-add.component';
import { CategoryDetailComponent } from './Layout/category-detail/category-detail.component';
import { BorrowComponent } from './Layout/borrow/borrow.component';
import { DialogBorrowComponent } from './Layout/dialog-borrow/dialog-borrow.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full', title: 'Login' },
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
            {
                path: 'categories',
                component: CategoryComponent,
                title: 'Category Manager'
            },
            {
                path: 'addCategory',
                component: CategoryAddComponent,
                title: 'Add Category',
            },
            {
                path: 'borrows',
                component: BorrowComponent,
                title: 'Borrow Manager'
            },
        ]
    },
    {
        path: 'dashboard/books/:id',
        component: BookDetailComponent,
        title: 'Book Detail',
        canActivate: [canActivateAuth],
    },
    {
        path: 'dashboard/categories/:id',
        component: CategoryDetailComponent,
        title: 'Category Detail',
        canActivate: [canActivateAuth],
    },

];
