import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CategoryChoice } from '../category-choice';
import { NotitielijstService } from '../notitielijst.service';
import { Notities } from '../notities';
import { Paginator } from '../paginator';

@Component({
  selector: 'app-notitie-lijst',
  templateUrl: './notitie-lijst.component.html',
  styleUrls: ['./notitie-lijst.component.css']
})
export class NotitieLijstComponent implements OnInit {

  geenResultaten: string; 
  homeLink: { title: string; url: string; };
  zoekOpName: string;
  choice: string;

  paginator: Paginator;

  weergavePerRij1:  Notities[];
  weergavePerRij2:  Notities[]; 
  weergavePerRij3:  Notities[];
  categories: CategoryChoice[];
  
  wait: boolean;

  constructor(
    private notitielijstService: NotitielijstService
    ) { 
 
      this.homeLink = { 
        'title': "Homepage", 
        'url': "/"
      };  

      this.paginator = new Paginator(0, 12);

      this.categories = [];
      this.geenResultaten = "";
      this.clearResults();
      this.wait = true;
      this.zoekOpName = "";
      this.choice = "";
  }  

  ngOnInit(): void { 
 
    this.geenResultaten = null;

    this.notitielijstService.getAllNumberOfNotities().subscribe((aantal: number) => { 

        if(aantal > 0) {

          this.paginator.totaleLengte = aantal;
          this.paginator.defaultLengte = aantal;

          this.notitielijstService.getAllNotities(this.paginator.pointer, this.paginator.pageSize).subscribe((data: Notities[]) => {

            this.splitData(data);
            this.wait = false;
      
            this.notitielijstService.getCategories().subscribe((data: any[]) => {
              if(data.length > 0) {
                this.categories = data;      
              }
              else {
                this.categories = null; 
              }
      
              this.categories.forEach(element => {
                 element.checked = true;
              }); 
            }); 
          });
        }
        else {
          this.geenResultaten = "Er staan geen notities in deze notitieboek";
          this.wait = false;
        }
    });
  }

  filterCategory = (category: number, isChecked: boolean) : void => {

    this.geenResultaten = null;
    this.categories[category].checked = isChecked ? false : true;

    if(this.zoekOpName === "") {
      this.prepareFiliterCategory(this.paginator.pointer, this.paginator.pageSize);
    } 
    else {
      this.prepareFilterZoekwoord(this.paginator.pointer, this.paginator.pageSize);
    }
  }

  private getCategoryString = () : string => { 
   return this.categories.filter(c => c.checked).map(c => c.catId).join(",")      
  }

  searchNotities = (choice: string, zoekwoord: string) : void => {

    this.geenResultaten = null;
    this.zoekOpName = zoekwoord;
    this.choice = choice;
    this.prepareFilterZoekwoord(this.paginator.pointer, this.paginator.pageSize);
  } 

  private prepareFiliterCategory = (pointer: number, aantal: number) => {

    let allowedCategories = "";
    allowedCategories = this.getCategoryString();

    if(allowedCategories != '') {
        
      this.notitielijstService.getFilterCategories(allowedCategories, pointer, aantal).subscribe((data: any) => {

        if(!data.hasOwnProperty("error")) {
    
          this.paginator.totaleLengte = data.totaal;

          if(data.results.length > 0) {
            this.splitData(data.results);
          } 
          else  {
            if(this.paginator.totaleLengte < 1)
                this.geenResultaten = "Er staan geen notities in deze notitieboek";

            this.clearResults();
          }
        } 
        else {
          this.geenResultaten = "Er is een onverwachte fout opgetreden!";
          this.clearResults();
        } 
      
      });       
    }
    else {
      this.geenResultaten = "Geen resultaten alles is uitgefilterd";
      this.clearResults();
    }
  }

  private prepareFilterZoekwoord = (pointer: number, aantal: number) : void => {

    let allowedCategories = this.getCategoryString();

    if(allowedCategories) {

      if(this.choice === "name") {
        this.notitielijstService.getFilterName(this.zoekOpName, allowedCategories, pointer, aantal).subscribe((data: any) => {
          
          if(!data.hasOwnProperty("error")) {
    
            this.paginator.totaleLengte = data.totaal;
  
            if(data.results.length > 0) {
              this.splitData(data.results);
            } 
            else  {
              if(this.paginator.totaleLengte < 1)
                this.geenResultaten = "Er staan geen notities in deze notitieboek";

              this.clearResults();
            }
          } 
          else {
            this.geenResultaten = "Er is een onverwachte fout opgetreden!";
            this.clearResults();
          } 
              
        });
      }
      else if(this.choice === "title") {
        this.notitielijstService.getFilterTitle(this.zoekOpName, allowedCategories, pointer, aantal).subscribe((data: any) => {
          
          if(!data.hasOwnProperty("error")) {
    
            this.paginator.totaleLengte = data.totaal;
  
            if(data.results.length > 0) {
              this.splitData(data.results);
            } 
            else  {
              if(this.paginator.totaleLengte < 1)
                this.geenResultaten = "Er staan geen notities in deze notitieboek";

              this.clearResults();
            }
          } 
          else {
            this.geenResultaten = "Er is een onverwachte fout opgetreden!";
            this.clearResults();
          } 
       
        });  
      }
      else {
        this.notitielijstService.getFilterFreeText(this.zoekOpName, allowedCategories, pointer, aantal).subscribe((data: any) => {
 
          if(!data.hasOwnProperty("error")) {
    
            this.paginator.totaleLengte = data.totaal;
  
            if(data.results.length > 0) {
              this.splitData(data.results);
            } 
            else  {
              if(this.paginator.totaleLengte < 1)
                this.geenResultaten = "Er staan geen notities in deze notitieboek";

              this.clearResults();
            }
          } 
          else {
            this.geenResultaten = "Er is een onverwachte fout opgetreden!";
            this.clearResults();
          } 
        });
      } 
    }  
    else {
      this.geenResultaten = "Geen resultaten alles is uitgefilterd";
      this.clearResults();
    }
  }

  private clearResults = () : void => {
    this.weergavePerRij1 = [];
    this.weergavePerRij2 = [];
    this.weergavePerRij3 = [];
  }

  private splitData = (notities: Notities[]) : void => {

    let lengte = notities.length;

    let aantalRij1 = Math.ceil(lengte / 3);
    let aantalRij2 = Math.floor(lengte / 3) + aantalRij1;
    let aantalRij3 = lengte + 1;

    this.weergavePerRij1 = notities.slice(0, aantalRij1);
    this.weergavePerRij2 = notities.slice(aantalRij1, aantalRij2);
    this.weergavePerRij3 = notities.slice(aantalRij2, aantalRij3); 
  }

  getResults = (event: PageEvent) : void => {

    this.clearResults();

    if(event.length > 0) {

      this.geenResultaten = null;
      this.paginator = new Paginator(event.pageIndex, event.pageSize);
      this.paginator.totaleLengte = event.length;
      
        if(this.zoekOpName === "") {
          this.prepareFiliterCategory(this.paginator.pointer, this.paginator.pageSize);
        } 
        else {
          this.prepareFilterZoekwoord(this.paginator.pointer, this.paginator.pageSize);
        }
    }
    else {
      this.geenResultaten = "Er staan nog geen notities in deze notitieboek";
    }
  }
}
