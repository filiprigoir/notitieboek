import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/Operators'
import { Users } from './users/users';

@Injectable({
  providedIn: 'root'
})
export class NotitielijstService {

  constructor(private HttpClient: HttpClient) {} 
    
  getUsers = () => {
    return this.HttpClient.get('https://delicious-mercury-ricotta.glitch.me/users');
  } 
  
 setUser = (user: Users) =>  {
    let headers = { 'content-type': 'Access-Control-Allow-Origin'}  
    return this.HttpClient.post('https://delicious-mercury-ricotta.glitch.me/users', user, {'headers': headers})
  }

}

