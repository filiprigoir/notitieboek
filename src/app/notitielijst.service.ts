import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotitielijstService {
  getCategory() {
    throw new Error('Method not implemented.');
  }
  
  headers: any;

  constructor(private http: HttpClient) {
  } 
  
  getUsers = (orderby: string, pointer: number, aantal: number) => { 
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/users?pointer=' + pointer + "&aantal=" + aantal + "&orderby=" + orderby, {'headers': this.headers});
  } 

  getUsersFilterOnName = (name: string, orderby: string, pointer: number, aantal: number) => { 
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/filterFindUser?pointer=' + pointer + "&aantal=" + aantal + "&orderby=" + orderby + "&name=" + name, {'headers': this.headers});
  } 

  getCountUsersFilterOnName = (name: string) => { 
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/aantalUsersMetFilter?name=' + name, {'headers': this.headers});
  } 
  
  getUser = (name: string) => {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/usernames/' + name, {'headers': this.headers});
  } 

  getAantalUsers = () => {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/aantalUsers/', {'headers': this.headers});
  } 

  getNotitiesUsers = (userId: number, pointer: number, aantal: number) => {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/usersNotities/' + userId + '/notities?pointer=' + pointer + '&aantal=' + aantal, {'headers': this.headers});
  }

  get5LaatsteUsers = () => {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/laatste5Users/', {'headers': this.headers});
  }

  getCategories = () => {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/categories', {'headers': this.headers});
  } 

  setUser = (name: string) =>  {
    return this.http.post('https://delicious-mercury-ricotta.glitch.me/users/', {'name': name }, {'headers': this.headers});
  }
  
  setCategory = (name: string) => {
    return this.http.post('https://delicious-mercury-ricotta.glitch.me/categories/', {'name': name }, {'headers': this.headers});
  }

  deleteUser = (id: number) => {  
    return this.http.delete('https://delicious-mercury-ricotta.glitch.me/users/' + id, {'headers': this.headers})
  }

  setNotitie = (name: string, catId: number, title: string, note: string) =>  {
    return this.http.post('https://delicious-mercury-ricotta.glitch.me/notities/users/' + name, {'catId': catId, 'title': title,'note': note}, {'headers': this.headers});
  }

  updateNotitie = (noteIid: number, title: string, note: string, catId: number) =>  {
    return this.http.put('https://delicious-mercury-ricotta.glitch.me/notities/' + noteIid, {'title': title, 'note': note, 'catId': catId}, {'headers': this.headers});
  }

  getAllNotities = (pointer: number, aantal: number) => {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/notities?pointer=' + pointer + '&aantal=' + aantal, {'headers': this.headers});
  }

  getAllNumberOfNotities = () => {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/numberAllNotities/', {'headers': this.headers});
  }

  getNumberOfNotitities = (id: number) => {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/aantalNotities/' + id, {'headers': this.headers});
  }
  
  deleteNote = (noteId: number) => {  
    return this.http.delete('https://delicious-mercury-ricotta.glitch.me/notities/' + noteId, {'headers': this.headers})
  }

  getStatistieken = (date: string) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/alleStatistieken/' + date, {'headers': this.headers});
  }

  getNieuwsteLeden = (date: string) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/nieuwsteLeden/' + date, {'headers': this.headers});
  }

  getNieuwsteNotities = (date: string) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/nieuwsteNotities/' + date, {'headers': this.headers});
  }

  getFilterCategories = (ids: string, pointer: number, aantal: number) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/filterCategories/?catIds=' + ids + '&pointer=' + pointer + '&aantal=' + aantal, {'headers': this.headers});
  } 

  getFilterName = (word: string, ids: string, pointer: number, aantal: number) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/filterName/?search=' + word + '&catIds=' + ids + '&pointer=' + pointer + '&aantal=' + aantal, {'headers': this.headers});
  } 

  getFilterTitle = (word: string, ids: string, pointer: number, aantal: number) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/filterTitle/?search=' + word + '&catIds=' + ids + '&pointer=' + pointer + '&aantal=' + aantal, {'headers': this.headers});
  } 

  getFilterFreeText = (word: string, ids: string, pointer: number, aantal: number) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/filterFreeText/?search=' + word + '&catIds=' + ids + '&pointer=' + pointer + '&aantal=' + aantal, {'headers': this.headers});
  } 

  getUserNameNotities = (name: string) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/username/?username=' + name, {'headers': this.headers});
  } 

  getUserNameInfo = (name: string) =>  {
    return this.http.get('https://delicious-mercury-ricotta.glitch.me/aantalNotitiesOnName/' + name, {'headers': this.headers});
  } 
  
  ngOnInit() {
    this.headers = { 'content-type': 'Access-Control-Allow-Origin' };
  }
}

