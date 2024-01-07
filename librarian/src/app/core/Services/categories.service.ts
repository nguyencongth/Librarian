import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, of } from 'rxjs';
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
  categoryHasBooks(categoryId: number): Observable<boolean> {
    return this.http.get<any[]>(`http://localhost:3000/books`).pipe(
      map((books: any[]) => {
        return books.some(book => book.categoryId === categoryId);
      })
    )
  }
  deleteCategory(id: number): Observable<any> {
    return this.categoryHasBooks(id).pipe(
      switchMap(hasBooks => {
        if (hasBooks) {
          window.alert('This category contains books. Can not delete');
          return of(false);
        } else {
          return this.http.delete(`${this.urlApi}/${id}`)
        }
      })
    );
  }
}
