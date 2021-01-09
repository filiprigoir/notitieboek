import { Component, OnInit, ViewChild } from '@angular/core';
import { Categories } from '../categories';
import { NotitielijstService } from '../notitielijst.service';
import { StatistiekenComponent } from '../statistieken/statistieken.component';

@Component({
  selector: 'app-notitie-aanmaken',
  templateUrl: './notitie-aanmaken.component.html',
  styleUrls: ['./notitie-aanmaken.component.css']
})
export class NotitieAanmakenComponent implements OnInit{

  @ViewChild(StatistiekenComponent)
  private statistiekenComponent: StatistiekenComponent;

  errorMessage: string;
  newTitle: string;
  categories: Categories[];
  homeLink: { title: string; url: string; };

  constructor(private notitielijstService: NotitielijstService) {
    this.newTitle = "";
    this.errorMessage = "";
  
    this.homeLink = {
      'title': "Homepage",
      'url': "/"
    };
  } 

  ngOnInit(): void {
    this.notitielijstService.getCategories().subscribe((data: any[]) => {
      if(data.length > 0) {
        this.categories = data;         
      }
      else {
        this.categories = null; 
      }
    });   
  }

  addnotitie = (naam: string, titel: string, notitietekst: string, category: string) : void => {
    
    this.errorMessage = "";
    this.newTitle = "";
    let knipLangeText = "";

    naam = naam.trim();
    titel = titel.trim();
    notitietekst = notitietekst.trim();

    if(!naam || !titel || !notitietekst || !category) {
      this.errorMessage = "Velden en categorie mogen niet leeg zijn!";
    } 
    else { 

      let snip = 24;
      let splitNotitieText = notitietekst.split(' ');
      splitNotitieText.forEach(check => {
          let count = check.length;
          if(count >= snip) {

             let run = Math.floor(count / snip);
             let rest = count % snip;

             let x = 0;
             for (let index = 0; index < run; index++) {
              knipLangeText += check.substr(x, snip) + " "; 
                x += snip;
             }   

             if(rest > 0)
               knipLangeText += check.substr(x, rest) + " "; 
          }
          else {
            knipLangeText += check + " ";
          }
      });

      let checkedNode = knipLangeText.trim();
      this.notitielijstService.setNotitie(naam, +category, titel, checkedNode).subscribe((data: any) => {
          if(data.hasOwnProperty("error")) {
              if(data.error == "User not exists") {
                this.errorMessage = "Deze naam is nog niet geregistreerd!";
              }
              else {
                this.errorMessage = "Notitie is niet ingvevoegd. Probeer opnieuw!";
              }
          }
          else {
              this.newTitle = titel;
              this.statistiekenComponent.addNotitie(1);
          }
      });
    }
  };  
}
