import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Product } from "./entities/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost:3000/api/products';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl);
  }

  findById(id: number): Observable<Product>{
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  findByCategoryId(id_category: number): Observable<Product[]>{
    const url = `${this.productsUrl}/category/${id_category}`;
    return this.http.get<Product[]>(url);
  }

  searchProducts(term: string): Observable<Product[]>{
    if(!term.trim()){
      return of([]); // empty term
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`);
  }
}
