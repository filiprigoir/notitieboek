import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { LedenModalComponent } from '../leden-modal/leden-modal.component';
import { NotitielijstService } from '../notitielijst.service';
import { Paginator } from '../paginator';
import { StatistiekenComponent } from '../statistieken/statistieken.component';
import { UpdateUser } from '../update-user';
import { Users } from '../users';
import  {Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  @ViewChild(StatistiekenComponent)
  private statistiekenComponent: StatistiekenComponent;
  
  users: Users[]; 
  homeLink: { title: string; url: string; };
  orderby: {text: string, name: string, sort: string, selected: boolean }[];
  geenResultaten: string;
  wait: boolean;

  showButtonSort: boolean;

  paginator: Paginator;
  
  sort: string; 
  actie: string;
  zoekOpName: string;
  userLink: { title: string; url: string; };
     
  constructor(
    private notitielijstService: NotitielijstService,
    private modalService: NgbModal,
    private cookieService: CookieService,
    public platform: Platform
    ) {
    this.users = [];
    this.actie = "";
    this.sort = "userId DESC";
    this.zoekOpName = "";
    this.geenResultaten = null;
    this.wait = true;

    this.paginator = new Paginator(0, 10);

    this.homeLink = {
      'title': "Homepage",  
      'url': "/"
    };

    if(this.cookieService.check('pageSizeLeden')) {
      let pageSize = +this.cookieService.get('pageSizeLeden');
      if(pageSize > 0 ) {
        this.paginator.pageSize = pageSize;
      }
    }

    this.userLink = {
      'title': "Geef notitieboek",
      'url': "/zoekenopnaam"
    };  

    this.orderby = [];
    this.setOrderBy();
   }
 
  ngOnInit(): void {

    this.notitielijstService.getAantalUsers().subscribe((aantal: any) => {
     
      this.paginator.totaleLengte = aantal; 
      this.paginator.defaultLengte = aantal; 

      if(aantal > 0) {
        this.notitielijstService.getUsers(this.sort,this.paginator.pointer,this.paginator.pageSize).subscribe((data: any[]) => {
          this.users = data;
        });
      }
      else {
        this.geenResultaten = "Er zijn nog geen leden geregistreerd!";
      }

      this.wait = false;
    });

    if(this.platform.FIREFOX) {
      this.showButtonSort = true;
    }
    else {
      this.showButtonSort = false;
    }
  }    

  RemoveUser = (user: UpdateUser) : void => {
    const modalRef = this.modalService.open(LedenModalComponent);
    modalRef.componentInstance.updateUser = user;

    modalRef.componentInstance.updateGegevens.subscribe((user: any) => {
      
      if(user.name == "Succesvol verwijderd!") {
          this.paginator.totaleLengte -= 1;
          this.paginator.defaultLengte -= 1;
          
          if(this.paginator.totaleLengte > 0) {
            this.setNewData();
            this.statistiekenComponent.subLeden();
          }
          else {
            this.geenResultaten = "Geen resultaten gevonden!";
          }
      }
    })
  }
  
  private setOrderBy = () : void => {
    this.orderby.push({ text: "Recentst eerst", name: "userId", sort: "DESC", selected: true });
    this.orderby.push({ text: "Oudste eerst", name: "userId", sort: "ASC", selected: false });
    this.orderby.push({ text: "Naam van A-Z", name: "name", sort: "ASC", selected: false });
    this.orderby.push({ text: "Naam van Z-A", name: "name", sort: "DESC", selected: false });

    if(this.cookieService.check('sortLeden')) {
      let orderby = this.cookieService.get('sortLeden');
      if(orderby != "" ) {
        
        let index = this.orderby.findIndex(o => o.name + " " + o.sort === orderby);
        if(index != -1) {
          this.orderby[0].selected = false;
          this.orderby[index].selected = true;
          this.sort = orderby;
        }
      }
    }
  }  

  getfilterOnName = (name: string) : void => {

    this.geenResultaten = null;
    this.actie = "zoekOpWoord";
    this.zoekOpName = name;

    this.notitielijstService.getCountUsersFilterOnName(this.zoekOpName).subscribe((count: number) => {
      
      this.paginator.totaleLengte = count;

      if(count > 0) { 
        this.notitielijstService.getUsersFilterOnName(this.zoekOpName,this.sort,this.paginator.pointer,this.paginator.pageSize).subscribe((data: any[]) => {
            this.users = data;
        });
      }
      else {
        this.geenResultaten = "Geen resultaten gevonden!";
      }
    });
  }
    
  getOrderBy = (orderBy: string) : void => { 

    this.geenResultaten = null;
 
    if(orderBy != this.sort) {
        this.cookieService.set('sortLeden', orderBy.toString());  
    } 
 
    this.sort = orderBy;
 
    if(this.zoekOpName === "") {
 
      this.paginator.totaleLengte = this.paginator.defaultLengte;
   
        if(this.paginator.totaleLengte > 0) { 
          this.notitielijstService.getUsers(this.sort,this.paginator.pointer,this.paginator.pageSize).subscribe((data: any[]) => {
            this.users = data;
            this.actie = "";     
          });
        }
        else {
          this.geenResultaten = "Er zijn nog geen leden geregistreerd!";
        }
    } 
    else {
      this.notitielijstService.getUsersFilterOnName(this.zoekOpName,this.sort,this.paginator.pointer,this.paginator.pageSize).subscribe((data: any[]) => {
        this.users = data;
      });
    }  
  } 

  private setNewData = () : void => {
    switch (this.actie) { 
      case "":
        this.notitielijstService.getUsers(this.sort,this.paginator.pointer,this.paginator.pageSize).subscribe((data: any[]) => {
          this.users = data;
        }); 
      break; 
       
      default: 
        this.notitielijstService.getUsersFilterOnName(this.zoekOpName,this.sort,this.paginator.pointer,this.paginator.pageSize).subscribe((data: any[]) => {
          this.users = data;
        });
    }
  }
  
  getResults = (event: PageEvent) : void => {

    this.users = [];
    
    if(event.length > 0) {

      this.geenResultaten = null;

      if(event.pageSize != this.paginator.pageSize)
        this.cookieService.set('pageSizeLeden', event.pageSize.toString());

      let defaultLengte = this.paginator.defaultLengte;
      this.paginator = new Paginator(event.pageIndex, event.pageSize);
      this.paginator.defaultLengte = defaultLengte;
      this.paginator.totaleLengte = event.length;
       
      this.setNewData();

    }
    else {
      this.geenResultaten = "Er zijn nog geen leden geregistreerd!";
    }
  }
}