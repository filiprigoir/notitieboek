import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url: { tekst: string; url: string; };
  home: { tekst: string, title: string; url: string; };
 
  constructor() { }

  ngOnInit(): void {
    this.url = {'tekst': "Categorie aanmaken",'url': "category"};
    this.home = {'tekst': "Notitieboek",'title': "Homepage",'url': ""};
  }
}
