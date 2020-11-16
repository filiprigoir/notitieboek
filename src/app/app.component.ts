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

    this.notitielijstService.setUser("Filip Rigoir").subscribe((data) => {
      console.log('Inserted ID:', data);
    });

    this.notitielijstService.getUsers().subscribe((data) => {
        console.log("info:" + data)       
      });

    this.notitielijstService.deleteUser(5).subscribe((data) => {
      console.log("deleted:" + data)  
    });

    this.notitielijstService.deleteNote(1).subscribe((data) => {
      console.log("deleted:" + data)  
    });

    this.notitielijstService.setNotitie(8, "Mijn eerste notitie").subscribe((data) => {
      console.log("Inserted:" + data)  
    });

    this.notitielijstService.updateNotitie(18, "Mijn eerste notitie").subscribe((data) => {
      console.log("Update:" + data)  
    });

  }  
}