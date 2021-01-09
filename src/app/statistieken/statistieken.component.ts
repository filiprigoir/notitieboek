import { Component, OnInit } from '@angular/core';
import { NotitielijstService } from '../notitielijst.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-statistieken',
  templateUrl: './statistieken.component.html',
  styleUrls: ['./statistieken.component.css']
})
export class StatistiekenComponent implements OnInit {
 
  alleNotities: {title: string, aantal: number};
  alleLeden:  {title: string, aantal: number};
  nieuweNotities: {title: string, aantal: number};
  nieuweLeden: {title: string, aantal: number}; 
   
  constructor(private notitielijstService: NotitielijstService) {
      this.alleNotities = {title: "totaal aantal notities", aantal: null};
      this.alleLeden = {title: "Totaal aantal Leden", aantal: null};
      this.nieuweNotities = {title: "Nieuwe notities vandaag", aantal: null};
      this.nieuweLeden = {title: "Nieuwe leden vandaag", aantal: null};
   } 

  ngOnInit(): void { 
    
    this.notitielijstService.getStatistieken(this.currentDate()).subscribe((data: any) => {
      this.alleNotities.aantal = data.alleNotities;
      this.alleLeden.aantal = data.alleLeden;
      this.nieuweNotities.aantal = data.nieuwsteNotities
      this.nieuweLeden.aantal = data.nieuwsteLeden;
    });    
  }  

  private currentDate = () : string => {
    let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');;   
    return currentDate.toString();
  } 

  addNotitie = (aantal: number) : void => {
     this.nieuweNotities.aantal += aantal; 
     this.alleNotities.aantal += aantal;
  }

  subNotitie = () : void => {
    this.notitielijstService.getNieuwsteNotities(this.currentDate()).subscribe((data: any) => {
      this.alleNotities.aantal = data.alleNotities;
      this.nieuweNotities.aantal = data.nieuweNotities;
    });  
  }

  addLeden = (aantal: number) : void => {
    this.nieuweLeden.aantal += aantal;
    this.alleLeden.aantal += aantal;
  }

  subLeden = () : void => {
    this.notitielijstService.getNieuwsteLeden(this.currentDate()).subscribe((data: any) => {
      this.alleLeden.aantal = data.totaal;
      this.nieuweLeden.aantal = data.vandaag;
    });  
  }
}
