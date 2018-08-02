import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Product } from '../entities/product';

class CartItem{
  product: Product;
  quantity: number;
  amount: number;
}

const IGV = 0.18;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = []; 
  private subtotal: number = 0;
  private tax: number = 0;
  private total: number = 0;
  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void{
    this.shoppingCartService.findAll().subscribe(items => {
      for(let item of items){
        this.productService.findById(item.id_product).subscribe(product => {
          const cartItem = new CartItem();
          cartItem.product = product;
          cartItem.quantity = item.quantity;
          cartItem.amount = item.amount;
          this.cartItems.push(cartItem);
          const amount = cartItem.amount;
          this.subtotal += amount;
          this.tax += amount * IGV;
          this.total += amount + amount * IGV;
        });
      }
      
      
    });
  }
}
