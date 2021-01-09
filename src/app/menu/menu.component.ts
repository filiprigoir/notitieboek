import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  menuLijst: { tekst: string; url: string; }[];

  constructor() { 
  }

  ngOnInit(): void {
    this.menuLijst = [
      {'tekst': "Notitielijst",'url': ""},
      {'tekst': "Notitie aanmaken",'url': "aanmaken"}, 
      {'tekst': "Notitie beheren",'url': "updaten"},
      {'tekst': "Ledenlijst",'url': "leden"}, 
      {'tekst': "Registreren",'url': "registreren"}
    ];
  }
}
