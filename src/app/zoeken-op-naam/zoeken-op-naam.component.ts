import { Component, OnDestroy, OnInit, ɵExtraLocaleDataIndex } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { NotitielijstService } from '../notitielijst.service';
import { Notities } from '../notities';
import { Paginator } from '../paginator';

@Component({
  selector: 'app-zoeken-op-naam',
  templateUrl: './zoeken-op-naam.component.html',
  styleUrls: ['./zoeken-op-naam.component.css']
})

export class ZoekenOpNaamComponent implements OnInit, OnDestroy  {

  geenResultaten: string;
  naamWeergave: string;
  userId: number;
  private sub: any; 
  homeLink: { title: string; url: string; };
  wait: boolean;

  paginator: Paginator;

  weergavePerRij1:  Notities[];
  weergavePerRij2:  Notities[];
  weergavePerRij3:  Notities[];

  constructor(
    private route: ActivatedRoute,
    private notitielijstService: NotitielijstService
    ) { 
 
      this.homeLink = { 
        'title': "Homepage", 
        'url': "/"
      }; 

      this.paginator = new Paginator(0, 12);

      this.wait = true;
      this.geenResultaten = "";
      this.resetResults();
    }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {

      this.userId = +params['userId'];

      this.notitielijstService.getNumberOfNotitities(this.userId).subscribe((aantal: number) => {

        this.paginator.totaleLengte = aantal;

        if(aantal > 0) {
            this.notitielijstService.getNotitiesUsers(this.userId, this.paginator.pointer, this.paginator.pageSize).subscribe((notities: Notities[]) => {

              this.naamWeergave = notities[0].name;
              this.geenResultaten = null;
              this.splitData(notities);
           });
        }
        else {
          this.geenResultaten = "Er staan nog geen notities in deze notitieboek ";
          this.userId = null;
          this.resetResults();
        }
        this.wait = false;
      });
   }); 
  } 
 
  private resetResults = () : void => {
    this.weergavePerRij1 = [];
    this.weergavePerRij2 = [];
    this.weergavePerRij3 = [];
  }

  getResults = (event: PageEvent) : void => {

    if(event.length > 0) {
      this.paginator = new Paginator(event.pageIndex, event.pageSize);
      this.paginator.totaleLengte = event.length;
      
      this.notitielijstService.getNotitiesUsers(this.userId, this.paginator.pointer, this.paginator.pageSize).subscribe((notities: Notities[]) => {

        if(notities.length > 0) {
          this.splitData(notities);
        }
        else {
          this.geenResultaten = "Er staan nog geen notities in deze notitieboek";
          this.userId = null;
          this.resetResults();
        }
     });

    }
    else {
      this.geenResultaten = "Er staan nog geen notities in deze notitieboek";
      this.userId = null;
      this.resetResults();
    }
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

  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }
}
