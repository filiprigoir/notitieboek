import { Component, OnInit, ViewChild } from '@angular/core';
import { Laatste5UsersComponent } from '../laatste5-users/laatste5-users.component';
import { NotitielijstService } from '../notitielijst.service';
import { StatistiekenComponent } from '../statistieken/statistieken.component';
import { Users } from '../users';

@Component({  
  selector: 'app-registreren',
  templateUrl: './registreren.component.html',
  styleUrls: ['./registreren.component.css']
})
export class RegistrerenComponent implements OnInit {

  @ViewChild(StatistiekenComponent)
  private statistiekenComponent: StatistiekenComponent;
 
  @ViewChild(Laatste5UsersComponent)
  private laatste5UsersComponent: Laatste5UsersComponent;

  homeLink: { title: string; url: string; };
  newUser: string;  
  errorMessage: string;
 
  constructor(private notitielijstService: NotitielijstService) {
    this.newUser = "";
    this.errorMessage = "";

    this.homeLink = {
      'title': "Homepage",
      'url': "/"
    };
   }

  ngOnInit(): void {
  }
 
  addGebruiker = (voornaam: string, achternaam: string) : void => {
 
    if(!voornaam || !achternaam) {
      this.errorMessage = "Alle velden zijn verplicht in te vullen!";
      this.newUser = "";
    }  
    else {
      this.errorMessage = "";
      this.newUser = "";
      let user = voornaam.trim() + " " + achternaam.trim();
  
      this.notitielijstService.setUser(user).subscribe((data: any) => {
  
        if(data.hasOwnProperty("error")) {
            if(data.error == "User already exists") {
              this.errorMessage = "Gebruiker is al geregistreerd. Gebruik een andere naam!";
            }
            else {
              this.errorMessage = "Gebruiker is niet ingvevoegd. Probeer opnieuw!";
            }
        }
        else {
          this.newUser = user;  
          this.statistiekenComponent.addLeden(1);
  
          this.notitielijstService.get5LaatsteUsers().subscribe((lijst: Users[]) => {
            this.laatste5UsersComponent.setList(lijst);
          });  
        }
      });
    }
  } 
}
