import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./entities/user";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl ='http://localhost:3000/api/users';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };
  constructor(private http: HttpClient) { }

  save(user: User): Observable<any>{
    const url = `${this.usersUrl}/signup`;
    return this.http.post<any>(url,user,this.httpOptions);
  }

  login(user: User): Observable<any>{
    const url = `${this.usersUrl}/login`;
    return this.http.post<any>(url,user,this.httpOptions);
  }
}
