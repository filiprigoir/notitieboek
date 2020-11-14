import { Component } from '@angular/core';
import { NotitielijstService } from './notitielijst.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notieboek';

  constructor(private notitielijstService: NotitielijstService) {

  this.notitielijstService.setUser("Filip Rigoir").subscribe((result) => {
    console.log('Inserted ID:', result);
  });

  this.notitielijstService.getUsers().subscribe((data) => {
      console.log("info:" + data)       
    });

  }  
}