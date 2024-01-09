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
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BorrowService } from '../../core/Services/borrow.service';
import { Router } from '@angular/router';
import { BookService } from '../../core/Services/book.service';
import { NgIf } from '@angular/common';
import { switchMap } from 'rxjs';

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

  borrow() {
    this.dialog.closeAll();
    this.borrowService.addBorrow(this.formNewBorrow.value).pipe(
      switchMap(() => {
        const currentBookQuantity = this.data.quantity;
        const currentQuantityBorrow = this.data.quantityBorrowed;
        const newBookQuantity = currentBookQuantity - 1;
        const newQuantityBorrowed = currentQuantityBorrow + 1;

        return this.bookService.updateBookBorrow(this.data.id, newBookQuantity, newQuantityBorrowed)
      })
    ).subscribe(() => {
      window.alert("Borrow successfully");
      this.route.navigate(['/dashboard/borrows']);
    });
  }
}
