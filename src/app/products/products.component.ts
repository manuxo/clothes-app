import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from "../product.service";
import { Product } from "../entities/product";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormControl, FormGroup } from "@angular/forms";
import { SharedAuthService } from '../shared-auth.service';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ShoppingCartService } from "../shopping-cart.service";
import { CartItem } from '../entities/cart-item';


class ProductItem{
  product: Product;
  form: FormGroup;
  amount: number;
};

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  productItems: ProductItem[] = [];
  products: Product[];
  page: number = 1;
  selectedQuantity: number = 1;
  selectedProduct: Product;
  cartItem = CartItem;
  modalReference: NgbModalRef;
  constructor(
    private productService : ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public authService: SharedAuthService,
    private modalService: NgbModal,
    private shoppingCartService: ShoppingCartService
  ) {
    //Reload component when params change
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit() {
    const id_category = +this.route.snapshot.paramMap.get('id_category');
    this.route.queryParams.subscribe(params => {
      if(params['name']){
        this.getProductsByNameLike(params['name']);
      }else{
        if(id_category){
          this.getProductsByCategoryId(id_category);
        }else{
          this.getProducts();
        }
      }
    });
  }

  private buildForms(): void {
    this.products.forEach(product => {
      this.productItems.push({
        product: product,
        form: new FormGroup({
          id: new FormControl(product.id),
          quantity: new FormControl(1)
        }),
        amount: product.price
      } as ProductItem);
    });
  }

  getProducts(): void{
    this.productService.findAll().subscribe(products => {
      this.products = products;
      this.buildForms();
    });
  }

  getProductsByCategoryId(id_category): void{
    this.productService.findByCategoryId(id_category).subscribe(products => {
      this.products = products;
      this.buildForms();
    });
  }

  getProductsByNameLike(name): void{
    this.productService.searchProducts(name).subscribe(products => {
      this.products = products;
      this.buildForms();
    });
  }
  openModal(content, productItem: ProductItem): void{
    this.selectedQuantity = Number.parseInt(productItem.form.get('quantity').value);
    this.selectedProduct = productItem.product;
    this.modalReference = this.modalService.open(content, {centered: true});
  }

  calcTotal(productItem: ProductItem, eventTarget: HTMLInputElement): void{
    let quantity = Number.parseInt(eventTarget.value);
    if(quantity > 100){
      quantity = 100;
      eventTarget.value = quantity.toString();
    }
    if(quantity < 1){
        quantity = 1;
        eventTarget.value = quantity.toString();
    }
    productItem.amount = quantity * productItem.product.price;
  }

  addToCart(): void {
    const item = new CartItem();
    item.id_product = this.selectedProduct.id;
    item.quantity = this.selectedQuantity;
    item.amount = this.selectedQuantity * this.selectedProduct.price;
    this.shoppingCartService.add(item).subscribe((cartItem) => {
      this.cartItem = cartItem;
    });
    this.modalReference.close();
  }
}
