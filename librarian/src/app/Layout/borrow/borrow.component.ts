import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { BookService } from '../../core/Services/book.service';
import { BorrowService } from '../../core/Services/borrow.service';
import { CategoriesService } from '../../core/Services/categories.service';
import { Subject, forkJoin, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-borrow',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  templateUrl: './borrow.component.html',
  styleUrl: './borrow.component.css'
})
export class BorrowComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'borrowName', 'bookId', 'categoryId', 'borrowDate', 'dueDate', 'status', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private unsubcribe$ = new Subject<void>();

  constructor(
    private bookService: BookService, 
    private borrowService: BorrowService, 
    private categoryService: CategoriesService,
    ) { }
  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  getData() {
    forkJoin(
      [
        this.borrowService.getBorrow(),
        this.bookService.getBook(),
        this.categoryService.category(),
      ],
      (borrowList, bookList, categoryList) => {
        return {
          borrows: borrowList,
          books: bookList,
          categories: categoryList
        };
      }
    )
    .pipe(
      takeUntil(this.unsubcribe$)
    )
    .subscribe((data)=>{
      const newData = data.borrows.map((x: any) => {
        const categoryName = data.categories.find(c => c.id === x.categoryId);
        const bookName = data.books.find((c:any) => c.id === x.bookId);
        return {
          ...x,
          categoryName: categoryName ? categoryName.name : null,
          bookName: bookName ? bookName.name : null
        }
      })
      
    this.dataSource.data = [...newData];  
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  returnBook(row: any) {
    row.dueDate = new Date();
    row.status = 'Returned';
    this.borrowService.returnBook(row.id, row.dueDate, row.status).pipe(
      switchMap((data: any) => {
        return this.bookService.getBookById(data.bookId).pipe(
          switchMap((book: any) => {
            const currentBookQuantity = book.quantity;
            const currentBookQuantityBorrow = book.quantityBorrowed;
            const newBookQuantity = currentBookQuantity + 1;
            const newQuantityBorrowed = currentBookQuantityBorrow - 1;         
            return this.bookService.updateBookBorrow(book.id, newBookQuantity, newQuantityBorrowed);
          })
        )
      })
    ).subscribe();
  }
}
