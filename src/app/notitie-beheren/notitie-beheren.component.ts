import { Component, OnInit, ViewChild } from '@angular/core';
import { NotitielijstService } from '../notitielijst.service';
import { Notities } from '../notities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotitieModalComponent } from '../notitie-modal/notitie-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { StatistiekenComponent } from '../statistieken/statistieken.component';
import { Paginator } from '../paginator';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-notitie-beheren',
  templateUrl: './notitie-beheren.component.html',
  styleUrls: ['./notitie-beheren.component.css'],
})
export class NotitieBeherenComponent implements OnInit {

  @ViewChild(StatistiekenComponent)
  private statistiekenComponent: StatistiekenComponent;
 
  homeLink: { title: string; url: string; };
  geenResultaten: string;
  weergavePerRij1: Notities[];
  weergavePerRij2: Notities[];
  weergavePerRij3: Notities[]; 
  name: string;
  wait: boolean;

  paginator: Paginator;

  naamWeergave: string;
  userId: number;

  constructor(
    private notitielijstService: NotitielijstService,
    private modalService: NgbModal,
    private cookieService: CookieService
    ) { 

    this.naamWeergave = null;
    this.geenResultaten = null;
    this.userId = null;

    this.paginator = new Paginator(0, 12);

    if(this.cookieService.check('pageSizeNotities')) {
      let pageSize = +this.cookieService.get('pageSizeNotities');
      if(pageSize > 0 ) {
        this.paginator.pageSize = pageSize;
      }
    }

    this.homeLink = {
      'title': "Homepage",
      'url': "/"
    };

  }

  ngOnInit(): void {
    this.wait = false;
  }

  detailNotitie = (notitie: Notities, actie: string) : void => {
    const modalRef = this.modalService.open(NotitieModalComponent);
    modalRef.componentInstance.updateNotitie = notitie;
    modalRef.componentInstance.updateNotitie.actie = actie;

    modalRef.componentInstance.updateGegevens.subscribe((notitie: any) => {
      
      if(notitie.note == "Succesvol verwijderd!") {

          this.paginator.totaleLengte -= 1;
          this.setResults();
          this.statistiekenComponent.subNotitie();
      }
    })
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
   
  setName = (name: string) : void => {

    this.name = name.trim();

    if(!name) {
      this.geenResultaten = "Geen naam ingegeven";
      this.resetResults();
    } 
    else {  
      this.geenResultaten = null;
      this.wait = true;
  
      this.notitielijstService.getUserNameInfo(name).subscribe((info: any) => {

          if(info.count > 0) {   
              
            this.paginator.totaleLengte = info.count;
            this.userId = info.userId;          
            this.setResults();
          } 
          else {
            this.geenResultaten = "Geen resultaten gevonden!";
            this.userId = null;
            this.resetResults();
          }

        this.wait = false;
      });
    }
  }

  private setResults = () : void => {

    this.notitielijstService.getNotitiesUsers(this.userId, this.paginator.pointer, this.paginator.pageSize).subscribe((notities: Notities[]) => {

      if(notities.length > 0) {
        this.naamWeergave = notities[0].name;
        this.geenResultaten = null;
        this.splitData(notities);
      }
      else {
        this.userId = null;
        this.geenResultaten = "Geen notities gevonden om te beheren!";
        this.resetResults();
      }
    });
  }

  private resetResults  = () : void => {
    this.weergavePerRij1 = [];
    this.weergavePerRij2 = [];
    this.weergavePerRij3 = []; 
  }

  getResults = (event: PageEvent) : void => {

    if(event.pageSize != this.paginator.pageSize)
      this.cookieService.set('pageSizeNotities', event.pageSize.toString());

    if(event.length > 0) {

      this.geenResultaten = null;
      this.paginator = new Paginator(event.pageIndex, event.pageSize);
      this.paginator.totaleLengte = event.length;

      this.setResults();
    }
    else {
      this.geenResultaten = "Er zijn nog geen leden geregistreerd!";
      this.userId = null;
      this.resetResults();
    }
  }
}
 