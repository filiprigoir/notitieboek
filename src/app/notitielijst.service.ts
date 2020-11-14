import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/Operators'

@Injectable({
  providedIn: 'root'
})
export class NotitielijstService {

  constructor(private Http: HttpClient) {} 
  
  getUsers = () => {
    return this.Http.get('https://delicious-mercury-ricotta.glitch.me/users');
  } 
  
 setUser = (user: string) =>  {
    let headers = { 'content-type': 'Access-Control-Allow-Origin'}  
    return this.Http.post('https://delicious-mercury-ricotta.glitch.me/users', user, {'headers': headers})
  }
}

