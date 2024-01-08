import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../core/Services/categories.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: Router, private categoryService: CategoriesService) { }
  subscription = new Subscription();

  ngOnInit(): void {
    this.getCategoriesData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCategoriesData() {
    this.subscription = this.categoryService.category().subscribe((category: any) => {
      this.data = category;
      this.dataSource.data = this.data;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategory(id: number) {
    if (window.confirm('Are you sure you want to delete')) {
      this.categoryService.deleteCategory(id).pipe(
        switchMap(() => this.categoryService.category())
      ).subscribe((category: any) => {
        this.data = category;
        this.dataSource.data = this.data;
      })
    } else return;
  }

  navigateToDetail(id: number) {
    this.route.navigate(['/dashboard/categories', id]);
  }
}
