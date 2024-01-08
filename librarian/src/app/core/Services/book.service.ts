import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private urlApi = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }

  getBook(): Observable<any> {
    return this.http.get(this.urlApi);
  }
  getBookById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}/${id}`);
  }
  updateBook(bookUpdate: any): Observable<any> {
    return this.http.patch(`${this.urlApi}/${bookUpdate.id}`, bookUpdate);
  }
  addBook(newBook: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, newBook);
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`)
  }
  updateBookBorrow(bookId: number, newBookQuantity: number, newQuantityBorrowed: number): Observable<any> {
    const status = newBookQuantity === 0 ? 'outOfStock' : 'available';
    return this.http.patch(`${this.urlApi}/${bookId}`, {quantity: newBookQuantity, quantityBorrowed: newQuantityBorrowed, status});
  }
}
