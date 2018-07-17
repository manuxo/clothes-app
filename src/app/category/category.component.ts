import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../category.service";
import { Category } from "../entities/category";
import { Location } from "@angular/common";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void{
    this.categoryService.findAll().subscribe(categories => {
      this.categories = categories;
    });
  }
}
