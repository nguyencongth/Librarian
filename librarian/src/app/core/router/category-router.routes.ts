import { Routes } from "@angular/router";
import { CategoryComponent } from "../../Layout/category/category.component";
import { CategoryDetailComponent } from "../../Layout/category-detail/category-detail.component";

export const CATEGORY_ROUTER: Routes = [
    { path: '', component: CategoryComponent, title: 'Category Manager'},
    { path: ':id', component: CategoryDetailComponent, title: 'Category Detail'}
]