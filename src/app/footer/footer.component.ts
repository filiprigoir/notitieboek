import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number;
  url: { tekst: string; url: string; };

  constructor() {
    this.url = {'tekst': "FAQ",'url': "faq"};
   }

  ngOnInit(): void {
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
  }
}
