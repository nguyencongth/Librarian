import { Routes } from "@angular/router";
import { BookAddComponent } from "../../Layout/book-add/book-add.component";
import { CategoryAddComponent } from "../../Layout/category-add/category-add.component";
import { BorrowComponent } from "../../Layout/borrow/borrow.component";
import { DashboardComponent } from "../../Layout/dashboard/dashboard.component";

export const DASHBOARD_ROUTER: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'books', loadChildren: () => import('./book-router.routes').then(mod => mod.BOOK_ROUTER) },
    { path: 'addBook', component: BookAddComponent, title: 'Add Book' },
    { path: 'categories', loadChildren: () => import('./category-router.routes').then(mod => mod.CATEGORY_ROUTER) },
    { path: 'addCategory', component: CategoryAddComponent, title: 'Add Category' },
    { path: 'borrows', component: BorrowComponent, title: 'Borrow Manager' }
]