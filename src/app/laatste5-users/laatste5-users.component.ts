import { Component, OnInit } from '@angular/core';
import { NotitielijstService } from '../notitielijst.service';
import { Users } from '../users';

@Component({
  selector: 'app-laatste5-users',
  templateUrl: './laatste5-users.component.html',
  styleUrls: ['./laatste5-users.component.css']
})
export class Laatste5UsersComponent implements OnInit {

  laatste5Users: Users[];   
  geenResultaten: string;  
  userLink: { title: string; url: string; };

  constructor(private notitielijstService: NotitielijstService) {
    this.laatste5Users = [];
    this.geenResultaten = null; 

    this.userLink = {
      'title': "Geef notitieboek",
      'url': "/zoekenopnaam"
    };  
   } 

  ngOnInit(): void {   
 
    this.geenResultaten = null;
    this.notitielijstService.get5LaatsteUsers().subscribe((data: any[]) => {
      if(data.length > 0) {
       this.laatste5Users = data;
      } 
      else {
        this.geenResultaten = "Er zijn geen resultaten gevonden";
      }
    });
  }

  setList = (nieuweLijst: Users[]) : void => {
      this.geenResultaten = null;
      this.laatste5Users = nieuweLijst;
  }
}