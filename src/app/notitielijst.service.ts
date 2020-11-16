import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/Operators'

@Injectable({
  providedIn: 'root'
})
export class NotitielijstService {

  headers: any;

  constructor(private Http: HttpClient) {} 
  
  getUsers = () => {
    return this.Http.get('https://delicious-mercury-ricotta.glitch.me/users', {'headers': this.headers});
  } 
  
  setUser = (name: string) =>  {
    return this.Http.post('https://delicious-mercury-ricotta.glitch.me/users', name, {'headers': this.headers});
  }

  deleteUser = (id: number) => {  
    return this.Http.delete('https://delicious-mercury-ricotta.glitch.me/users/' + id, {'headers': this.headers})
  }

  setNotitie = (id: number, note: string) =>  {
    return this.Http.post('https://delicious-mercury-ricotta.glitch.me/notities/' + id, note, {'headers': this.headers});
  }

  updateNotitie = (id: number, note: string) =>  {
    return this.Http.post('https://delicious-mercury-ricotta.glitch.me/notities/update/' + id, note, {'headers': this.headers});
  }

  deleteNote = (noteId: number) => {  
    return this.Http.delete('https://delicious-mercury-ricotta.glitch.me/notities/' + noteId, {'headers': this.headers})
  }

  ngOnInit() {
    this.headers = { 'content-type': 'Access-Control-Allow-Origin'};
  }
}

