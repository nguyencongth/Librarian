import { Component, Inject } from '@angular/core';
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
import { FormBuilder, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { BorrowService } from '../../core/Services/borrow.service';
import { Router } from '@angular/router';
import { BookService } from '../../core/Services/book.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-borrow',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgIf
  ],
  templateUrl: './dialog-borrow.component.html',
  styleUrl: './dialog-borrow.component.css'
})
export class DialogBorrowComponent {
  // dataBook: any;
  formNewBorrow = this.formBuilder.group({
    borrowName: ['', Validators.required],
    bookId: [this.data.id],
    categoryId: [this.data.categoryId],
    borrowDate: [new Date()],
    dueDate: [''],
    status: ['Borrowing']
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private borrowService: BorrowService,
    private bookService: BookService,
    public dialog: MatDialog,
    private route: Router,
    private formBuilder: FormBuilder
  ) { }

  borrow(): void {
    this.dialog.closeAll();
    this.borrowService.addBorrow(this.formNewBorrow.value).subscribe((data: any) => {

      this.bookService.getBookById(data.bookId).subscribe((book: any) => {

        const currentBookQuantity = book.quantity || 0;
        const newBookQuantity = currentBookQuantity - 1;
        this.bookService.updateBookQuantity(data.bookId, newBookQuantity).subscribe();

        const currentQuantityBorrow = book.quantityBorrowed;
        const newQuantityBorrowed = currentQuantityBorrow + 1;
        this.bookService.updateBookQuantityBorrowed(data.bookId, newQuantityBorrowed).subscribe();
      })
      window.alert("Borrow successfully");
      this.route.navigate(['/dashboard/borrows']);
    })
  }
}
