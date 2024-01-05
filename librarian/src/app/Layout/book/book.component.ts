import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBorrowComponent } from '../dialog-borrow/dialog-borrow.component';
import { BookService } from '../../core/Services/book.service';
import { CategoriesService } from '../../core/Services/categories.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit, AfterViewInit, OnDestroy {
  selected = '';
  displayedColumns: string[] = ['position', 'categoryName', 'name', 'quantity', 'quantityBorrowed', 'status', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  subscription = new Subscription();

  constructor(private bookService: BookService, private categoryService: CategoriesService, private route: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBookData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCategoryNames() {
    this.data.forEach((book, index) => {
      this.categoryService.getCategoryById(book.categoryId).subscribe((category: any) => {
        this.data[index].categoryName = category.name;
        this.dataSource.data = [...this.data];
      });
    });
  }

  getBookData() {
    this.subscription = this.bookService.getBook().subscribe((book: any) => {
      this.data = book;
      this.dataSource.data = this.data;
      this.getCategoryNames();
      this.updateBookStatus()
    })
  }

  updateBookStatus() {
    for (const book of this.data) {
      const newStatus = book.quantity === 0 ? 'outOfStock' : 'available';
      if (book.status !== newStatus) {
        this.bookService.updateBookStatus(book.id, book.quantity).subscribe(()=>{
          this.getBookData()
        });
      }
    }
  }

  deleteBook(id: number): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.bookService.deleteBook(id).subscribe();
      this.getBookData();
    } else return;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyNameFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyCategoryFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.categoryName.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyStatusFilter() {
    if (this.selected === 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = this.selected;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToDetail(id: number) {
    this.route.navigate(['/dashboard/books', id]);
  }

  openDialog(id: number): void {
    const selectedItem = this.dataSource.data.find(book => book.id === id);
    if (selectedItem) {
      this.dialog.open(DialogBorrowComponent, {
        data: selectedItem
      });
    }
  }

  resetFilters() {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('mat-form-field input');
    inputs.forEach((input: HTMLInputElement) => {
      input.value = '';
    });
    this.dataSource.filter = '';
    this.selected = 'all';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
