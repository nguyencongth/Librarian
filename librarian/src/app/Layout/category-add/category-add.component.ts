import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../core/Services/categories.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    NgFor
  ],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent {
  newCategory: any = { name: ''};
  constructor(private categoryService: CategoriesService, private route: Router){}
  Add() {
    this.categoryService.addCategory(this.newCategory).subscribe((data) => {
      this.newCategory = data;
      window.alert("Add successfully");
      this.route.navigate(['/dashboard/categories']);
    })
  }
}
