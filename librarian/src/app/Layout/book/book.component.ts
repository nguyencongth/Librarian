import { Subject, forkJoin, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
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
  displayedColumns: string[] = ['id', 'categoryName', 'name', 'quantity', 'quantityBorrowed', 'status', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private categoryService: CategoriesService,
    private route: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData() {
    forkJoin(
      [
        this.bookService.getBook(),
        this.categoryService.category(),
      ],
      (bookList, categoryList) => {
        return {
          books: bookList,
          categories: categoryList
        };
      }
    ).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe((data) => {
        const newData = data.books.map((x: any) => {
          const found = data.categories.find(c => c.id === x.categoryId)
          return {
            ...x,
            categoryName: found ? found.name : null
          }
        })
        this.dataSource.data = [...newData];
      });
  }

  deleteBook(id: number): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.bookService.deleteBook(id).subscribe();
      this.getData();
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
