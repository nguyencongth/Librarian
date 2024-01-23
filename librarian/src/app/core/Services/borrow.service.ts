import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }
  private urlApi = 'https://my-json-server.typicode.com/nguyencongth/demo/borrow';

  getBorrow(): Observable<any> {
    return this.http.get(this.urlApi);
  }

  addBorrow(newBorrow: any): Observable<any> {
    return this.http.post(`${this.urlApi}`, newBorrow);
  }
  returnBook(id: number, dueDate: Date, status: string):Observable<any> {
    return this.http.patch(`${this.urlApi}/${id}`,{dueDate: dueDate, status: status})
  }
}
