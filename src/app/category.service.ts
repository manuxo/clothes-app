import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "./entities/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  findById(id: number): Observable<Category>{
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url);
  }
}
