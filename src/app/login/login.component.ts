import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from '../user.service';
import { User } from '../entities/user';
import { SharedAuthService } from '../shared-auth.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private userService: UserService,
    private location: Location,
    public authService: SharedAuthService
  ) { }

  ngOnInit() {
  }

  register(){
    const first_name = this.signupForm.get('first_name').value.trim();
    const last_name = this.signupForm.get('last_name').value.trim();
    const email = this.signupForm.get('email').value.trim();
    const password = this.signupForm.get('password').value;
    this.userService.save({first_name,last_name,email,password} as User).subscribe(data => alert(`Usuario registrado - ${data.insertId}`));
  }

  login(){
    const email = this.loginForm.get('email').value.trim();
    const password = this.loginForm.get('password').value;
    this.userService.login({email,password} as User).subscribe(res => {
      localStorage.setItem('jwt-user',res.token);
      const id = res.userData.userId;
      this.authService.setUser({id,email} as User);
      this.location.back();
    });
  }
}
