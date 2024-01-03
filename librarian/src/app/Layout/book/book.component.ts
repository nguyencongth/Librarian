import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBorrowComponent } from '../dialog-borrow/dialog-borrow.component';
import { BookService } from '../../core/Services/book.service';

@Component({
  selector: 'app-book',
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
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'categoryId', 'name', 'quantity', 'quantityBorrowed', 'status', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookService: BookService, private route: Router, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getBookData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getBookData() {
    this.bookService.getBook().subscribe((book: any)=>{
        this.data = book;
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

  deleteBook(id: number): void {
    if( window.confirm('Are you sure you want to delete?')) {
      this.bookService.deleteBook(id).subscribe();
      this.getBookData();
    } else return;
   
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
}
