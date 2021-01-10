import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { NotitieLijstComponent } from './notitie-lijst/notitie-lijst.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotitieAanmakenComponent } from './notitie-aanmaken/notitie-aanmaken.component';
import { NotitieBeherenComponent } from './notitie-beheren/notitie-beheren.component';
import { RegistrerenComponent } from './registreren/registreren.component';
import { UsersDisplayComponent } from './users-display/users-display.component';
import { HeaderComponent } from './header/header.component';
import { StatistiekenComponent } from './statistieken/statistieken.component';
import { Laatste5UsersComponent } from './laatste5-users/laatste5-users.component';
import { ZoekenOpNaamComponent } from './zoeken-op-naam/zoeken-op-naam.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotitieModalComponent } from './notitie-modal/notitie-modal.component';
import { CategorieAanmakenComponent } from './categorie-aanmaken/categorie-aanmaken.component';
import { LedenModalComponent } from './leden-modal/leden-modal.component';
import { FooterComponent } from './footer/footer.component';
import { FaqComponent } from './faq/faq.component';
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from './material/material.module';
 
@NgModule({
  declarations: [ 
    AppComponent, 
    NotitieLijstComponent,
    RegistrerenComponent,
    MenuComponent,
    NotitieAanmakenComponent, 
    NotitieBeherenComponent,
    UsersDisplayComponent,
    HeaderComponent,
    StatistiekenComponent,
    Laatste5UsersComponent,  
    ZoekenOpNaamComponent, 
    NotitieModalComponent,
    CategorieAanmakenComponent,
    LedenModalComponent,
    FooterComponent,
    FaqComponent
  ],    
  imports: [    
    BrowserModule, 
    HttpClientModule,  
    RouterModule.forRoot([  
      { path: '', component: NotitieLijstComponent },
      { path: 'aanmaken', component: NotitieAanmakenComponent },
      { path: 'updaten', component: NotitieBeherenComponent },
      { path: 'category', component: CategorieAanmakenComponent },
      { path: 'registreren', component: RegistrerenComponent },
      { path: 'leden', component: UsersDisplayComponent },
      { path: 'zoekenopnaam/:userId', component: ZoekenOpNaamComponent},
      { path: 'faq', component: FaqComponent}
    ]),
    BrowserAnimationsModule, 
    MaterialModule, 
    NgbModule, 
  ],
  exports: [
    UsersDisplayComponent,
    MaterialModule,
    UsersDisplayComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }