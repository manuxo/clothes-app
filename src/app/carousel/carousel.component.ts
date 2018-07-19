import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  images : Array<string>;

  constructor() { }

  ngOnInit() {
    this.getImages();
  }

  getImages(){
    this.images= [
      'carousel1.jpg',
      'carousel2.jpg',
      'carousel3.jpg'
    ];
  }
}
