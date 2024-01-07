import { Routes } from "@angular/router";
import { BookComponent } from "../../Layout/book/book.component";
import { BookDetailComponent } from "../../Layout/book-detail/book-detail.component";

export const BOOK_ROUTER: Routes = [
    { path: '', component: BookComponent, title: 'Book Manager' },
    { path: ':id', component: BookDetailComponent, title: 'Book Detail' }
]