import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../core/Services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../core/Services/categories.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgFor,
    NgIf
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

  bookFormDetails = this.fb.group({
    id: [''],
    categoryId: [0, Validators.required],
    name: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1)]]
  })

  categories: any[] = [];
  constructor(
    private bookService: BookService,
    private categoryService: CategoriesService,
    private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bookDetail();
    this.getCategory();
  }

  bookDetail(): void {
    this.router.params.subscribe(params => {
      const bookId = params['id'];
      this.bookService.getBookById(bookId).subscribe((data: any) => {
        this.bookFormDetails.patchValue({
          id: data.id,
          name: data.name,
          categoryId: data.categoryId,
          quantity: data.quantity
        })
      })
    })
  }

  getCategory(): void {
    this.categoryService.category().subscribe((data: any[]) => {
      this.categories = data;
    })
  }

  onSave(): void {
    const formValue = this.bookFormDetails.value
    this.bookService.updateBook(formValue).subscribe(() => {
      window.alert('Update successfully')
      this.route.navigate(['/dashboard/books']);
    })
  }
}
