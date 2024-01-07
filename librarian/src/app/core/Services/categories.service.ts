import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private urlApi = 'http://localhost:3000/category';

  constructor(private http: HttpClient, private route: Router) { }

  category(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }
  getCategoryById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}/${id}`);
  }
  updateCategory(category: any): Observable<any> {
    return this.http.patch(`${this.urlApi}/${category.id}`, category)
  }
  addCategory(newCategory: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, newCategory);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`)
  }
}
