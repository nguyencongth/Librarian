import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BorrowService } from '../../core/Services/borrow.service';
import { Router } from '@angular/router';
import { BookService } from '../../core/Services/book.service';

@Component({
  selector: 'app-dialog-borrow',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './dialog-borrow.component.html',
  styleUrl: './dialog-borrow.component.css'
})
export class DialogBorrowComponent implements OnInit {
  dataBook: any;
  newBorrow: any = { borrowName: '', bookId: this.data.id, categoryId: this.data.categoryId, borrowDate: new Date().toLocaleDateString(), dueDate: '', status: "Borrowing" }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private borrowService: BorrowService,
    private bookService: BookService,
    public dialog: MatDialog,
    private route: Router
  ) { }
  ngOnInit(): void {
    this.dataBook = this.data;
  }

  borrow(): void {
    this.dialog.closeAll();
    this.borrowService.addBorrow(this.newBorrow).subscribe((data: any) => {
      this.newBorrow = data;

      this.bookService.getBookById(this.newBorrow.bookId).subscribe((book: any) => {

        const currentBookQuantity = book.quantity || 0;
        const newBookQuantity = currentBookQuantity - 1;
        this.bookService.updateBookQuantity(this.newBorrow.bookId, newBookQuantity).subscribe();

        const currentQuantityBorrow = book.quantityBorrowed;
        const newQuantityBorrowed = currentQuantityBorrow + 1;
        this.bookService.updateBookQuantityBorrowed(this.newBorrow.bookId, newQuantityBorrowed).subscribe();
      })
      window.alert("Borrow successfully");
      this.route.navigate(['/dashboard/borrows']);
    })
  }
}
