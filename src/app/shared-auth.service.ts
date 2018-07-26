import { Injectable } from '@angular/core';
import { User } from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {
  user: User;
  constructor() { }

  getUser(): User{
    const id = sessionStorage['userId'];
    const email = sessionStorage['email'];
    return {id,email} as User;
  }

  setUser(user: User){
    sessionStorage.setItem('email',user.email);
    sessionStorage.setItem('userId', user.id.toString());
  }

  isAuth(): boolean{
    if(sessionStorage['email'])
      return true;
    else
      return false;
  }

  logout(){
    sessionStorage.clear();
  }
}
