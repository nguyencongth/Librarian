import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../core/Services/categories.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgFor,
    NgIf
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent implements OnInit {
  formCategoryDetail = this.fb.group({
    id: [''],
    name: ['', Validators.required]
  })
  constructor(
    private categoryService: CategoriesService,
    private router: ActivatedRoute, private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoryDetail();
  }

  categoryDetail(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.categoryService.getCategoryById(id).subscribe((data: any) => {
        this.formCategoryDetail.patchValue({
          id: data.id,
          name: data.name
        })
      })
    })
  }

  onSave(): void {
    if (this.formCategoryDetail.invalid) {
      return;
    }
    const formValue = this.formCategoryDetail.value;
    this.categoryService.updateCategory(formValue).subscribe(() => {
      window.alert('Update successfully')
      this.route.navigate(['/dashboard/categories']);
    })
  }
}
