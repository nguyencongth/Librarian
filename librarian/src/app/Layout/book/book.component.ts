import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'categoryId', 'name', 'quantity', 'quantityBorrowed', 'status', 'actions'];
  data: any[] =[];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.fetchData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  fetchData() {
    this.http.get('http://localhost:3000/books').subscribe((data: any) => {
      this.data = data;
      this.dataSource.data = this.data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    const url = 'http://localhost:3000/books'
    console.log("log")
    this.http.delete(`${url}/${id}`)
    .subscribe((res: any) => {
      console.log(res)
    })
    this.fetchData();
  }
}
