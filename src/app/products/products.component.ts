import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from "../product.service";
import { Product } from "../entities/product";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Product[];

  constructor(
    private productService : ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    //Reload component when params change
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit() {
    const id_category = +this.route.snapshot.paramMap.get('id_category');
    if(id_category){
      this.getProductsByCategoryId(id_category);
    }
    else{
      this.getProducts();
    }
  }

  getProducts(): void{
    this.productService.findAll().subscribe(products => {
      this.products = products;
    });
  }

  getProductsByCategoryId(id_category): void{
    this.productService.findByCategoryId(id_category).subscribe(products => {
      this.products = products;
    });
  }
}
