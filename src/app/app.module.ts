import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from "./product.service";
import { CategoryComponent } from './category/category.component';
import { CategoryService } from "./category.service";
import { AppRoutingModule } from './/app-routing.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SharedAuthService } from './shared-auth.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoryComponent,
    ProductSearchComponent,
    CarouselComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [ProductService,CategoryService, SharedAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
