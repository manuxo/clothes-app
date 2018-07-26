import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from '../user.service';
import { User } from '../entities/user';
import { SharedAuthService } from '../shared-auth.service';
import { Router } from "@angular/router";
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
    private router: Router,
    public authService: SharedAuthService
  ) { }

  ngOnInit() {
  }

  private authenticate(email: string, password: string): void{
    this.userService.login({email,password} as User).subscribe(res => {
      localStorage.setItem('jwt-user',res.token);
      const id = res.userData.userId;
      this.authService.setUser({id,email} as User);
      this.router.navigate(['/products']);
    });
  }

  register(){
    if(this.signupForm.invalid)
      return;
    const first_name = this.signupForm.get('first_name').value.trim();
    const last_name = this.signupForm.get('last_name').value.trim();
    const email = this.signupForm.get('email').value.trim();
    const password = this.signupForm.get('password').value;
    this.userService.save({first_name,last_name,email,password} as User).subscribe(data => {
      console.log('User added - ' + JSON.stringify(data));
      this.authenticate(email,password);
    });
    
  }

  login(){
    if(this.loginForm.invalid)
      return;
    const email = this.loginForm.get('email').value.trim();
    const password = this.loginForm.get('password').value;
    this.authenticate(email,password);
  }
}
