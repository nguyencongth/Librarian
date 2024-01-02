import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private urlApi = 'http://localhost:3000/category';

  constructor(private http: HttpClient) { }

  category(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }
  getCategoryById(id: number) : Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}/${id}`);
  }
  updateCategory(bookCategory: any): Observable<any> {
    return this.http.patch(`${this.urlApi}/${bookCategory.id}`, bookCategory);
  }
  addCategory(newCategory: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, newCategory);
  }

}
