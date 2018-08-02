import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartItem } from './entities/cart-item';
import { SharedAuthService } from './shared-auth.service';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  constructor(private http: HttpClient,private authService: SharedAuthService) {}
  private shoppingCartUrl = 'http://localhost:3000/api/shoppingCart';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json','authorization':`Bearer ${this.authService.getToken()}`
    })
  };

  findAll(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.shoppingCartUrl,this.httpOptions);
  }

  add(cartItem: CartItem): Observable<any>{
    return this.http.post<CartItem>(`${this.shoppingCartUrl}/add`,cartItem,this.httpOptions);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.shoppingCartUrl}/${id}`,this.httpOptions);
  }

}
