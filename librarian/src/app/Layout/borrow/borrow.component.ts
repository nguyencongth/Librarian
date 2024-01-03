import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { BookService } from '../../core/Services/book.service';
import { BorrowService } from '../../core/Services/borrow.service';

@Component({
  selector: 'app-borrow',
  standalone: true,
  imports: [
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
export class BorrowComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'borrowName', 'bookId', 'categoryId', 'borrowDate', 'dueDate', 'status', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private bookService: BookService, private borrowService: BorrowService) { }
  ngOnInit(): void {
    this.getBorrowDate();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getBorrowDate() {
    this.borrowService.getBorrow().subscribe((borrow: any)=>{
      this.data = borrow;
      this.dataSource.data = this.data;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  returnBook(row: any) {
    row.dueDate = new Date().toLocaleDateString();
    row.status = 'Returned';
    this.http.patch(`http://localhost:3000/borrow/${row.id}`, { dueDate: row.dueDate, status: row.status })
      .subscribe((updateRow: any) => {
        const index = this.dataSource.data.findIndex((dataRow) => dataRow.id === updateRow.id);
        if (index !== -1) {
          this.dataSource.data[index] = updateRow;
          this.dataSource._updateChangeSubscription();

          this.bookService.getBookById(updateRow.bookId)
            .subscribe((book: any) => {

              const currentBookQuantity = book.quantity || 0;
              const newBookQuantity = currentBookQuantity + 1;
              this.bookService.updateBookQuantity(updateRow.bookId, newBookQuantity).subscribe()
              
              const currentQuantityBorrow = book.quantityBorrowed;
              const newQuantityBorrowed = currentQuantityBorrow - 1;
              this.bookService.updateBookQuantityBorrowed(updateRow.bookId, newQuantityBorrowed).subscribe()
            })
        }
      })
  }
}
