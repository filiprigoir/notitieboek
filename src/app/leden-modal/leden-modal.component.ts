import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotitielijstService } from '../notitielijst.service';
import { UpdateUser } from '../update-user';

@Component({
  selector: 'app-leden-modal',
  templateUrl: './leden-modal.component.html',
  styleUrls: ['./leden-modal.component.css']
})
export class LedenModalComponent implements OnInit {

  @Input() updateUser: UpdateUser; 
  @Output() updateGegevens: EventEmitter<any> = new EventEmitter();
  
  aantalNotities: number;

  constructor(    
    private notitielijstService: NotitielijstService,
    public activeModal: NgbActiveModal
    ) { 
      this.aantalNotities = null;
    }
 
  userVerwijderen = () : void => {

    this.notitielijstService.deleteUser(this.updateUser.userId).subscribe((data: any) => {
      
      this.updateUser.name = "Succesvol verwijderd!";
      this.updateUser.userId = null;
      this.updateUser.notities = null; 
      this.updateUser.datum = null;

      this.updateGegevens.emit(this.updateUser);
    });
  }

  ngOnInit(): void {
    this.notitielijstService.getNumberOfNotitities(this.updateUser.userId).subscribe((data: number) => {
      this.aantalNotities = data; 
    });  
  }
}
