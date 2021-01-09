import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from '../categories';
import { NotitielijstService } from '../notitielijst.service';
import { UpdateNotitie } from '../update-notitie';

@Component({
  selector: 'app-notitie-modal',
  templateUrl: './notitie-modal.component.html',
  styleUrls: ['./notitie-modal.component.css']
})
export class NotitieModalComponent implements OnInit {

  @Input() updateNotitie: UpdateNotitie; 
  @Output() updateGegevens: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  newTitle: string; 
  categories: Categories[];
  updated: number

  constructor(
    private notitielijstService: NotitielijstService,
    public activeModal: NgbActiveModal
    ) {
      this.errorMessage = null;

   }

  ngOnInit(): void {
    this.notitielijstService.getCategories().subscribe((data: any[]) => {
      if(data.length > 0) {
          this.categories = data;                   
      }
    });

    this.updated = 0;
  }
  notitieUpdaten = (title: string, note: string, info: string) : void => {

    this.errorMessage = null;

    if(this.updateNotitie.title === title 
      && this.updateNotitie.note === note 
      && this.updateNotitie.category + "_" + this.updateNotitie.catId === info) {
      this.errorMessage = "Er werd niets aangepast!";
    }
    else {

        let infoArr = info.split('_');
        let catId = +infoArr[1];
        let category = infoArr[0];
        let knipLangeText = "";

        let snip = 24;
        let splitNotitieText = note.split(' ');
        splitNotitieText.forEach(check => {
            let count = check.length;
            if(count >= snip) {
  
               let run = Math.floor(count / snip);
               let rest = count % snip;
  
               let x = 0;
               for (let index = 0; index < run; index++) {
                knipLangeText += check.substr(x, snip) + " "; 
                  x += snip;
               }   
  
               if(rest > 0)
                 knipLangeText += check.substr(x, rest) + " "; 
            }
            else {
              knipLangeText += check + " ";
            }
        });
  
        let checkedNote = knipLangeText.trim();
        this.notitielijstService.updateNotitie(this.updateNotitie.noteId, title, checkedNote, catId).subscribe((data: any[]) => {
  
        if(data.hasOwnProperty("error")) {
          this.errorMessage = "Oep... Er ging iets fout!";
        } 
        else {
          this.newTitle = title;
          
          this.updateNotitie.title = title;
          this.updateNotitie.note = checkedNote;
          this.updateNotitie.catId = catId;
          this.updateNotitie.category = category;  
          
          this.updated += 1;
        }     
      });
    }
  }

  notitieVerwijderen = () : void => {

    this.notitielijstService.deleteNote(this.updateNotitie.noteId).subscribe((data: any) => {
      
      this.updateNotitie.note = "Succesvol verwijderd!";
      this.updateNotitie.title = null;
      this.updateNotitie.catId = null; 
      this.updateNotitie.noteId = null; 
      this.updateNotitie.name = null;  
      this.updateNotitie.category = null;
      this.updateNotitie.datum = null;

      this.updateGegevens.emit(this.updateNotitie);
    });
  }
}