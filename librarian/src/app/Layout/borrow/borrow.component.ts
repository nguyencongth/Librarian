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
import { Router } from '@angular/router';
import { BookService } from '../../core/Services/book.service';

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

  constructor(private http: HttpClient, private bookService: BookService, private route: Router) { }
  ngOnInit(): void {
    this.fetchData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  fetchData() {
    this.http.get('http://localhost:3000/borrow').subscribe((data: any) => {
      this.data = data;
      this.dataSource.data = this.data;
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
    row.dueDate = new Date().toISOString();
    row.status = 'Returned';
    this.http.patch(`http://localhost:3000/borrow/${row.id}`, { dueDate: row.dueDate, status: row.status })
      .subscribe((updateRow: any) => {
        const index = this.dataSource.data.findIndex((dataRow) => dataRow.id === updateRow.id);
        if (index !== -1) {
          this.dataSource.data[index] = updateRow;
          this.dataSource._updateChangeSubscription();

          this.bookService.getBookById(updateRow.bookId)
            .subscribe((book: any) => {
              console.log(book);

              const currentBookQuantity = book.quantity || 0;
              console.log(currentBookQuantity);

              const returnedQuantity = 1;
              const newBookQuantity = currentBookQuantity + returnedQuantity;
              console.log(newBookQuantity);


              this.bookService.updateBookQuantity(updateRow.bookId, newBookQuantity)
                .subscribe((res: any) => {
                  console.log(res);
                })
              this.bookService.updateBookQuantityBorrowed(updateRow.bookId, 0)
                .subscribe((res: any) => {
                  console.log(res);
                })
            })
        }
      })
  }
}