import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private urlApi = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }

  getBookById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}/${id}`);
  }
  updateBook(bookUpdate: any): Observable<any> {
    return this.http.patch(`${this.urlApi}/${bookUpdate.id}`, bookUpdate);
  }
  addBook(newBook: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, newBook);
  }
  updateBookQuantity(bookId: number, newBookQuantity: number): Observable<any> {
    return this.http.patch(`${this.urlApi}/${bookId}`, { quantity: newBookQuantity });
  }
  updateBookQuantityBorrowed(bookId: number, newQuantityBorrowed: number): Observable<any> {
    return this.http.patch(`${this.urlApi}/${bookId}`, { quantityBorrowed: newQuantityBorrowed });
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`)
  }
}
