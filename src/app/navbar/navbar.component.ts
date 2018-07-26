import { Component, OnInit } from '@angular/core';
import { SharedAuthService } from '../shared-auth.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: SharedAuthService, private location: Location) { }

  ngOnInit() {
  }
}
