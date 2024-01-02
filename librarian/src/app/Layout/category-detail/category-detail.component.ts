import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/Services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../core/Services/categories.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgFor
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent implements OnInit {
  category: any = { 
    name: ""
  };
  constructor(private categoryService: CategoriesService, private router: ActivatedRoute, private route:Router) {}
  ngOnInit(): void {
    this.categoryDetail();
  }
  categoryDetail(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.categoryService.getCategoryById(id).subscribe((data: any) => {
        this.category = data;
      })
    })
  }

  save():void {
    this.categoryService.updateCategory(this.category).subscribe((data:any) => {
      this.category = data;
      window.alert('Update successfully')
      this.route.navigate(['/dashboard/categories']);
    })
  }
}
