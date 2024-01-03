import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../core/Services/book.service';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/Services/categories.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    NgFor
  ],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent implements OnInit {
  bookForm = this.formBuilder.group({
    name: ['', Validators.required],
    categoryId: ['', Validators.required],
    quantity: ['', Validators.required]
  })

  categories: any[] = [];
  newBook: any = { categoryId: '', name: '', quantity: '', quantityBorrowed: 0};
  constructor(private bookService: BookService, private categoryService: CategoriesService, private formBuilder: FormBuilder, private route: Router){}

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory(): void {
    this.categoryService.category().subscribe((data: any[]) => {
      this.categories = data;  
    })
  }

  Add() {
    this.bookService.addBook(this.newBook).subscribe((data) => {
      this.newBook = data;
      window.alert("Add successfully");
      this.route.navigate(['/dashboard/books']);
    })
  }
}
