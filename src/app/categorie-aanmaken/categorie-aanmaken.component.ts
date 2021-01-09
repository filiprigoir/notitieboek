import { Component, OnInit } from '@angular/core';
import { Categories } from '../categories';
import { NotitielijstService } from '../notitielijst.service';

@Component({
  selector: 'app-categorie-aanmaken',
  templateUrl: './categorie-aanmaken.component.html',
  styleUrls: ['./categorie-aanmaken.component.css']
})
export class CategorieAanmakenComponent implements OnInit {
 
  homeLink: { title: string; url: string; };
  categories: Categories[];
  errorMessage: string;
  newCategory: string;

  constructor(private notitielijstService: NotitielijstService) {

  this.categories = []; 
  this.errorMessage = null;
  this.newCategory = null;

    this.homeLink = {
      'title': "Homepage",
      'url': "/"
    };

   }

  ngOnInit(): void {
    
    this.notitielijstService.getCategories().subscribe((data: any[]) => {
      if(data.length > 0) {
        this.categories = data;         
      }
    });
  }
 
  addCategory = (name: string) : void => {

    this.newCategory = null;
    this.errorMessage = null;

    if(!name) {
      this.errorMessage = "Veld mag niet leeg zijn!";
    }
    else {
        this.notitielijstService.setCategory(name).subscribe((data: any) => {

          if(!data.hasOwnProperty("error")) {
              this.newCategory = name;

              let category = new Categories(); 
              category.name = name;
      
              this.categories.push(category);
          } 
          else {
            this.errorMessage = "Categorie is al ingevoegd!";
          } 
        }); 
    }
  }
}
