import { Component, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/Services/categories.service';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    NgFor,
    NgIf
  ],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent implements OnDestroy {
  
  subcription = new Subscription();
  constructor(
    private formBuilder: FormBuilder, 
    private categoryService: CategoriesService, 
    private route: Router
    ){}
  categoryForm = this.formBuilder.group({
    name: ['', Validators.required]
  })
  addCategory() {
    this.subcription = this.categoryService.addCategory(this.categoryForm.value).subscribe((data) => {
      this.categoryForm = data;
      window.alert("Add successfully");
      this.route.navigate(['/dashboard/categories']);
    })
  }
  ngOnDestroy(): void {
    if(this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
