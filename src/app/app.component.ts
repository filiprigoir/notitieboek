import { Component } from '@angular/core';
import { NotitielijstService } from './notitielijst.service';
import { Users } from './users/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notieboek';

  constructor(private NotitielijstService: NotitielijstService) {

  let addUser = new Users();
  addUser.name = "Filip rigoir";

  this.NotitielijstService.setUser(addUser).subscribe(result => {
    console.log('Inserted ID:', result);
  });

   NotitielijstService.getUsers().subscribe((data) => {
      console.log("info:" + data)       
    });
  }

  
}



