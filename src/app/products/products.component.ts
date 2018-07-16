import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { Product } from "../entities/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.getProducts();
  }


  getProducts(): void{
    this.productService.findAll().subscribe(products => {
      this.products = products;
    });
  }
}
