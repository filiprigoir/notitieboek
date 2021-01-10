import { Component, OnInit } from '@angular/core';
import { Faq } from '../faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  
  faqLijst: Faq[];

  homeLink: {tekst: string; url: string};

  constructor() { 
    this.faqLijst = [];

    this.homeLink = {
      'tekst': "Homepage",
      'url': "/"
    };
  }

  ngOnInit(): void {

    let faq1 = new Faq();
    faq1.Id = 1;
    faq1.vraag = 'Er zijn geen categorieën aanwezig? Wat nu?';
    faq1.antwoord = 'Wanneer de database is (of wordt) gewist dan zijn er geen leden, notities en ook geen categorieën om '
    + 'weer te geven. Om te starten ga je eerst naar de rechterhoek in de header en klik op "Categorie aanmaken". '
    + 'Geef de naam van een categorie en klik dan op aanmaken. De categorie is nu beschikbaar en ook geïntegreerd in '
    + 'alle zoekopties en filters. Het staat je vrij een nieuw categorie te creëren!'; 
    
    this.faqLijst.push(faq1); 

    let faq2 = new Faq();
    faq2.Id = 2;
    faq2.vraag = 'Moet ik mij registreren?';
    faq2.antwoord = 'Om te kijken hoef je niet geregistreerd te zijn. Alle berichten en leden zijn vrij te beheren. '
    + 'Je kan wel een nieuwe naam registreren om notities met deze naam te bewaren. Ga dan naar het hoofdmenu en '
    + 'klik op "Registreren".';
    
    this.faqLijst.push(faq2);

    let faq3 = new Faq();
    faq3.Id = 3;
    faq3.vraag = 'Kan ik een lidmaatschap aanpassen?';
    faq3.antwoord = 'Ja en neen, je kan een lidmaatschap enkel aanmaken of schrappen uit de lijst. '
    + 'Om een lidmaatschap ongedaan te maken ga je naar hoofdmenu "Ledenlijst" en zoek de naam in de lijst de je wilt verwijderen. '
    + 'Klik op prullenmand en in het venster klik je uitschrijven. Let op: alle notities worden mee verwijderd.';
    
    this.faqLijst.push(faq3);

    let faq4 = new Faq();
    faq4.Id = 4;
    faq4.vraag = 'Waar kan ik een notitie aanmaken op de naam die ik heb geregistreerd?';
    faq4.antwoord = 'Simpel, je gaat naar het hoofmenu "Notitie aanmaken"”. Geef daar de volledige naam in en dan vul je de '
    + 'volgende gegevens in: 1). Kies een titel, 2). Notitietekst, 3). Kies een categorie ' 
    + '* Alle velden zijn verplicht in te vullen. De notitie wordt onmiddellijk gepubliceerd na het klikken op aanmaken.';
    
    this.faqLijst.push(faq4);

    let faq5 = new Faq();
    faq5.Id = 5;
    faq5.vraag = 'Mag ik een notitie aanpassen of verwijderen?';
    faq5.antwoord = 'Ja dat mag zeker. Hiervoor klik je in het hoofdmenu op "Notitie beheren" '
    + 'en geef de naam in van wie je de notities wilt beheren. Klik op potlootje om te wijzigen en '
    + 'klik op prullenmand om een notitie definitief te verwijderen. Een venster komt tevoorschijn '
    + 'en de rest wijst zichzelf uit.';
    
    this.faqLijst.push(faq5);

    let faq6 = new Faq();
    faq6.Id = 6;
    faq6.vraag = 'Wat gebeurt er wanneer ik een ontzettend lang woord ingeef?';
    faq6.antwoord = 'Alle woorden worden automatisch gesplitst met een spatie vanaf de 24ste karakter om de layout niet te ontregelen. '
    + 'Dus ik zou zeggen: Doe maar!';
    
    this.faqLijst.push(faq6);

    let faq7 = new Faq();
    faq7.Id = 7;
    faq7.vraag = 'Waar worden alle notities weergeven?';
    faq7.antwoord = 'In het hoofdmenu onder "Notitielijst" kan je alles terugvinden die op het moment in de database staan. '
    + 'Om het laden capabel te maken worden niet alle notities op één pagina getoond maar gesplitst op verschillende '
    + 'pagina’s naargelang hoeveel er zijn gevonden. Je kan vrij kiezen uit een lijst hoeveel je exact op één pagina wilt zien. '
    + 'Je persoonlijke voorkeur wordt bijgehouden via een cookie.';
    
    this.faqLijst.push(faq7);
   
    let faq8 = new Faq();
    faq8.Id = 8;
    faq8.vraag = 'Hoe werkt het filteren en uitgebreid zoeken op woorden?';
    faq8.antwoord = 'Je kunt op twee pagina’s filteren en zoeken op woorden: Ledenlijst en Notitielijst. '
    + 'Als je een zoekwoord ingeeft dan zal het verder filteren op dat zoekwoord. Dus beide filters werken samen '
    + 'om betere, snellere en correcte resultaten te bekomen.';
    
    this.faqLijst.push(faq8);
  }
}
