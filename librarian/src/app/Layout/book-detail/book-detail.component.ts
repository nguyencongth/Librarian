import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/Services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../core/Services/categories.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgFor
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book: any = { 
    categoryId: 0,
    name: "",
    quantity: 0,
  };
  categories: any[] = [];
  constructor(private bookService: BookService, private categoryService: CategoriesService,private router: ActivatedRoute, private route:Router) {}
  ngOnInit(): void {
    this.bookDetail();
    this.getCategory();
  }
  bookDetail(): void {
    this.router.params.subscribe(params => {
      const bookId = params['id'];
      this.bookService.getBookById(bookId).subscribe((data: any) => {
        this.book = data;
        console.log(this.book);
      })
    })
  }
  getCategory(): void {
    this.categoryService.category().subscribe((data: any[]) => {
      this.categories = data;
      console.log(this.categories);
      
    })
  }

  save():void {
    this.bookService.updateBook(this.book).subscribe((data:any) => {
      this.book = data;
      window.alert('Update successfully')
      this.route.navigate(['/dashboard/books']);
    })
  }
}
