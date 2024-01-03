import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }
  private urlApi = 'http://localhost:3000/borrow';
  addBorrow(newBorrow: any): Observable<any> {
    return this.http.post(`${this.urlApi}`, newBorrow);
  }
}
