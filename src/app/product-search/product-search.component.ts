import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl()
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search(){
    this.router.navigateByUrl(`/products?name=${this.productForm.get('name').value}`);
  }

}
