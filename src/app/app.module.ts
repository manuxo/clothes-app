import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from "./product.service";
import { CategoryComponent } from './category/category.component';
import { CategoryService } from "./category.service";
import { AppRoutingModule } from './/app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProductService,CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
